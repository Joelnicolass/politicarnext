import { GameState, ProcessTurnPayload } from "@/types/reducer";
import { STAT_MIN, STAT_MAX } from "../game_manager.provider";

export const processTurnReducer = (
  state: GameState,
  action: {
    payload: ProcessTurnPayload;
  }
): GameState => {
  const { choice } = action.payload;

  // Apply choice effects
  const newStats = state.stats.map((val, idx) => {
    const delta = choice.effect[idx];
    return Math.max(STAT_MIN, Math.min(STAT_MAX, val + delta));
  }) as [number, number, number, number];

  // Process status effects
  let nextEffects = [...state.activeEffects];
  let turnLog: string | null = null;

  if (choice.statusEffect) {
    nextEffects.push({ ...choice.statusEffect });
    turnLog = `¡Activado: ${choice.statusEffect.name}!`;
  }

  // Apply passive effects
  const passiveDelta: [number, number, number, number] = [0, 0, 0, 0];
  nextEffects.forEach((eff) => {
    passiveDelta[eff.stat] += eff.val;
  });

  const finalStats = newStats.map((val, idx) => {
    return Math.max(STAT_MIN, Math.min(STAT_MAX, val + passiveDelta[idx]));
  }) as [number, number, number, number];

  // Decrease effect durations and remove expired ones
  nextEffects = nextEffects
    .map((e) => ({ ...e, duration: e.duration - 1 }))
    .filter((e) => e.duration > 0);

  // Check objectives
  let updatedObjectives = state.objectives;
  if (choice.tags && choice.tags.length > 0) {
    updatedObjectives = state.objectives.map((obj) => {
      if (!obj.completed && choice.tags!.includes(obj.requiredTag)) {
        return { ...obj, completed: true };
      }
      return obj;
    });
  }

  // Check for game over conditions with original messages
  let gameOver: string | null = null;
  const [pueblo, reservas, orden, sindicatos] = finalStats;

  if (pueblo <= STAT_MIN) {
    gameOver = "La gente rodeó la Rosada con antorchas. Te vas en helicóptero.";
  } else if (pueblo >= STAT_MAX) {
    gameOver = "Te nombran Emperador de la Polenta. Fin de la República.";
  } else if (reservas <= STAT_MIN) {
    gameOver = "Quiebra total. El país se vende por partes en MercadoLibre.";
  } else if (reservas >= STAT_MAX) {
    gameOver = "¡Sobran dólares! Compras Uruguay y te retiras.";
  } else if (orden <= STAT_MIN) {
    gameOver = "Ley de la Selva. El Ministro de Economía es el más fuerte.";
  } else if (orden >= STAT_MAX) {
    gameOver = "Gran Hermano es real. Nadie se mueve sin permiso.";
  } else if (sindicatos <= STAT_MIN) {
    gameOver = "Paro indeterminado por aburrimiento. Nadie trabaja.";
  } else if (sindicatos >= STAT_MAX) {
    gameOver = "El Sindicato de Camioneros te expropió el sillón.";
  }

  const allCompleted =
    updatedObjectives.length > 0 && updatedObjectives.every((o) => o.completed);

  return {
    ...state,
    turns: state.turns + 1,
    stats: finalStats,
    activeEffects: nextEffects,
    turnLog,
    objectives: updatedObjectives,
    allObjectivesCompleted: allCompleted,
    gameOver,
    previewSide: null,
  };
};
