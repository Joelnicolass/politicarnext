import { GameState, ProcessTurnPayload } from "@/types/reducer";
import { CardData, Deck, Objective } from "@/types";
import { STAT_MIN, STAT_MAX } from "../game_manager.provider";
import {
  applyDifficultyToEffect,
  applyDifficultyMultiplier,
  drawCardFromDeck,
  filterNewCards,
  filterNewCharacters,
  filterNewObjectives,
} from "@/utils/deck.utils";
import { logger } from "@/utils/dev.utils";

enum SpecialEffectType {
  ADD_DECK = "add_deck",
  ADD_CARDS = "add_cards",
  ADD_OBJECTIVES = "add_objectives",
}

export const processTurnReducer = (
  state: GameState,
  action: {
    payload: ProcessTurnPayload;
  }
): GameState => {
  const { choice, currentCard } = action.payload;

  // Process special effects FIRST (before applying choice effects)
  let updatedState = { ...state };

  if (choice.specialEffect) {
    const { specialEffect } = choice;

    switch (specialEffect.type) {
      case SpecialEffectType.ADD_DECK: {
        const deck = specialEffect.data as Deck;

        if (
          deck &&
          deck.cards &&
          deck.cards.length > 0 &&
          !state.addedDeckIds.has(deck.id)
        ) {
          // Filter new content
          const newCards = filterNewCards(
            state.deck.available.concat(state.deck.discard),
            deck.cards
          );
          const newCharacters = deck.characters
            ? filterNewCharacters(state.characters, deck.characters)
            : {};
          const newObjectives = deck.objectivesPool
            ? filterNewObjectives(state.objectives, deck.objectivesPool)
            : [];

          // Update state with new content
          updatedState = {
            ...updatedState,
            deck: {
              ...updatedState.deck,
              available: [...updatedState.deck.available, ...newCards],
            },
            characters: { ...updatedState.characters, ...newCharacters },
            objectives: [
              ...updatedState.objectives,
              ...newObjectives.map((o) => ({ ...o, completed: false })),
            ],
            addedDeckIds: new Set([...updatedState.addedDeckIds, deck.id]),
          };
        }
        break;
      }

      case SpecialEffectType.ADD_CARDS: {
        const data = specialEffect.data as { cards?: CardData[] };
        if (data.cards) {
          const newCards = filterNewCards(
            state.deck.available.concat(state.deck.discard),
            data.cards
          );
          updatedState = {
            ...updatedState,
            deck: {
              ...updatedState.deck,
              available: [...updatedState.deck.available, ...newCards],
            },
          };
        }
        break;
      }

      case SpecialEffectType.ADD_OBJECTIVES: {
        const data = specialEffect.data as {
          objectives?: Omit<Objective, "completed">[];
        };
        if (data.objectives) {
          const newObjectives = filterNewObjectives(
            state.objectives,
            data.objectives
          );
          updatedState = {
            ...updatedState,
            objectives: [
              ...updatedState.objectives,
              ...newObjectives.map((o) => ({ ...o, completed: false })),
            ],
          };
        }
        break;
      }
    }
  }

  // Apply difficulty multiplier to choice effects
  const adjustedEffect = applyDifficultyToEffect(
    choice.effect,
    updatedState.difficulty
  );

  logger({
    choiceEffect: choice.effect,
    adjustedEffect,
    difficulty: updatedState.difficulty,
  });

  // Apply choice effects
  const newStats = updatedState.stats.map((val, idx) => {
    const delta = adjustedEffect[idx];
    return Math.max(STAT_MIN, Math.min(STAT_MAX, val + delta));
  }) as [number, number, number, number];

  logger({ newStatsBeforePassive: newStats });

  // Process status effects
  let nextEffects = [...updatedState.activeEffects];
  let turnLog: string | null = null;

  if (choice.statusEffect) {
    // Apply difficulty multiplier to status effect value
    const adjustedStatusEffect = {
      ...choice.statusEffect,
      val: applyDifficultyMultiplier(
        choice.statusEffect.val,
        updatedState.difficulty
      ),
    };
    nextEffects.push(adjustedStatusEffect);
    turnLog = `¡Activado: ${choice.statusEffect.name}!`;

    logger({
      originalStatusEffect: choice.statusEffect,
      addedStatusEffect: adjustedStatusEffect,
    });
  }

  // Apply passive effects
  const passiveDelta: [number, number, number, number] = [0, 0, 0, 0];
  nextEffects.forEach((eff) => {
    passiveDelta[eff.stat] += eff.val;
  });

  logger({ passiveDelta });

  const finalStats = newStats.map((val, idx) => {
    return Math.max(STAT_MIN, Math.min(STAT_MAX, val + passiveDelta[idx]));
  }) as [number, number, number, number];

  logger({ finalStats });

  // Decrease effect durations and remove expired ones
  nextEffects = nextEffects
    .map((e) => ({ ...e, duration: e.duration - 1 }))
    .filter((e) => e.duration > 0);

  logger({ nextEffects });

  // Check objectives
  let updatedObjectives = updatedState.objectives;
  if (choice.tags && choice.tags.length > 0) {
    updatedObjectives = updatedState.objectives.map((obj) => {
      if (!obj.completed && choice.tags!.includes(obj.requiredTag)) {
        return { ...obj, completed: true };
      }
      return obj;
    });
  }

  logger({ updatedObjectives });

  // Check for game over conditions
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

  logger({ gameOver, allCompleted });

  // Draw next card using the utility function
  let nextCard: CardData | null = null;
  let updatedAvailable = updatedState.deck.available;
  let updatedDiscard = updatedState.deck.discard;

  if (!gameOver && !allCompleted) {
    const drawResult = drawCardFromDeck(
      updatedState.deck.available,
      updatedState.deck.discard,
      currentCard
    );
    nextCard = drawResult.nextCard;
    updatedAvailable = drawResult.updatedAvailable;
    updatedDiscard = drawResult.updatedDiscard;
  }

  return {
    ...updatedState,
    turns: updatedState.turns + 1,
    currentCard: nextCard,
    deck: { available: updatedAvailable, discard: updatedDiscard },
    stats: finalStats,
    activeEffects: nextEffects,
    turnLog,
    objectives: updatedObjectives,
    allObjectivesCompleted: allCompleted,
    gameOver,
    previewSide: null,
    previewDiffs: [0, 0, 0, 0],
  };
};
