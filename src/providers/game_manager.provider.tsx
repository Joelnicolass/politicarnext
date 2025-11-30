import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
  useMemo,
} from "react";
import { CardData, Character, Objective, Choice, Deck } from "@/types";
import {
  GameState,
  GameAction,
  Action,
  GameContextValue,
  Difficulty,
} from "@/types/reducer";
import { initGameActionReducer } from "./reducers/init_game.reducer";
import { drawCardReducer } from "./reducers/draw_card.reducer";
import { addCardsReducer } from "./reducers/add_cards.reducer";
import { addDeckReducer } from "./reducers/add_deck.reducer";
import { processTurnReducer } from "./reducers/process_turn.reducer";
import { addObjectiveReducer } from "./reducers/add_objective.reducer";
import { addCharactersReducer } from "./reducers/add_characters.reducer";
import { setPreviewReducer } from "./reducers/set_preview.reducer";
import { resetGameReducer } from "./reducers/reset_game.reducer";

//INDICADORES -> [Opinión Pública, Situación Económica, Defensa Nacional, Gremios]
export const INITIAL_STATS: [number, number, number, number] = [50, 50, 50, 50];
export const STAT_MAX = 100;
export const STAT_MIN = 0;

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case Action.INIT_GAME:
      return initGameActionReducer(state, action);

    case Action.DRAW_CARD:
      return drawCardReducer(state, action);

    case Action.ADD_CARDS:
      return addCardsReducer(state, action);

    case Action.ADD_DECK:
      return addDeckReducer(state, action);

    case Action.PROCESS_TURN:
      return processTurnReducer(state, action);

    case Action.ADD_OBJECTIVES:
      return addObjectiveReducer(state, action);

    case Action.ADD_CHARACTERS:
      return addCharactersReducer(state, action);

    case Action.SET_PREVIEW:
      return setPreviewReducer(state, action);

    case Action.RESET_GAME:
      return resetGameReducer(state, action);

    default:
      return state;
  }
}

const GameContext = createContext<GameContextValue | null>(null);

export function useGameManager() {
  const context = useContext(GameContext);
  if (!context)
    throw new Error("useGameManager must be used within GameManagerProvider");

  return context;
}

interface GameManagerProviderProps {
  children: ReactNode;
  cards: CardData[];
  characters: Record<string, Character>;
  objectivesPool: Omit<Objective, "completed">[];
  difficulty: Difficulty;
}

export function GameManagerProvider({
  children,
  cards,
  characters,
  objectivesPool,
  difficulty,
}: GameManagerProviderProps) {
  const initialState: GameState = {
    turns: 0,
    currentCard: null,
    difficulty,
    deck: { available: [], discard: [] },
    stats: INITIAL_STATS,
    gameOver: null,
    activeEffects: [],
    objectives: [],
    allObjectivesCompleted: false,
    turnLog: null,
    previewSide: null,
    previewDiffs: [0, 0, 0, 0],
    characters,
    addedDeckIds: new Set(),
  };

  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Initialize game
  const initGame = useCallback(() => {
    // Select 3 random objectives
    const shuffled = [...objectivesPool].sort(() => 0.5 - Math.random());
    const selectedObjectives = shuffled
      .slice(0, 3)
      .map((o) => ({ ...o, completed: false }));

    dispatch({
      type: Action.INIT_GAME,
      payload: { initialCards: cards, objectives: selectedObjectives },
    });
  }, [cards, objectivesPool]);

  // Initialize on mount
  React.useEffect(() => {
    if (!state.currentCard) {
      initGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Process special effects (integrated into reducer actions)
  const processSpecialEffect = useCallback(
    (choice: Choice) => {
      if (!choice.specialEffect) return;

      const { specialEffect } = choice;

      switch (specialEffect.type) {
        case "add_deck": {
          const deck = specialEffect.data as Deck;

          if (!deck || !deck.cards || deck.cards.length === 0) return;
          if (state.addedDeckIds.has(deck.id)) return;

          dispatch({
            type: Action.ADD_DECK,
            payload: {
              id: deck.id,
              cards: deck.cards,
              characters: deck.characters,
              objectives: deck.objectivesPool,
            },
          });

          break;
        }

        case "add_cards": {
          const data = specialEffect.data as { cards?: CardData[] };
          if (data.cards)
            dispatch({ type: Action.ADD_CARDS, payload: data.cards });

          break;
        }

        case "add_objectives": {
          const data = specialEffect.data as {
            objectives?: Omit<Objective, "completed">[];
          };
          if (data.objectives)
            dispatch({ type: Action.ADD_OBJECTIVES, payload: data.objectives });

          break;
        }

        default:
          break;
      }
    },
    [state.addedDeckIds]
  );

  // Handle choice (left or right)
  const handleChoice = useCallback(
    (dir: "left" | "right") => {
      if (!state.currentCard) return;
      const choice =
        dir === "left" ? state.currentCard.left : state.currentCard.right;

      // Process special effect FIRST (adds cards to deck)
      processSpecialEffect(choice);

      // Process the turn (applies stats, effects, objectives)
      dispatch({ type: Action.PROCESS_TURN, payload: { choice } });

      // Draw next card (after all state updates)
      dispatch({
        type: Action.DRAW_CARD,
        payload: { cardToDiscard: state.currentCard },
      });
    },
    [state.currentCard, processSpecialEffect]
  );

  // Handle preview
  const handlePreview = useCallback((side: "left" | "right" | null) => {
    dispatch({ type: Action.SET_PREVIEW, payload: side });
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    // Select 3 random objectives
    const shuffled = [...objectivesPool].sort(() => 0.5 - Math.random());
    const selectedObjectives = shuffled
      .slice(0, 3)
      .map((o) => ({ ...o, completed: false }));

    dispatch({
      type: Action.RESET_GAME,
      payload: {
        initialCards: cards,
        objectives: selectedObjectives,
        characters,
      },
    });
  }, [cards, objectivesPool, characters]);

  // Deck info (memoized)
  const deckInfo = useMemo(
    () => ({
      availableCount: state.deck.available.length,
      discardCount: state.deck.discard.length,
      totalCount: state.deck.available.length + state.deck.discard.length,
    }),
    [state.deck.available.length, state.deck.discard.length]
  );

  const value: GameContextValue = {
    state,
    handleChoice,
    handlePreview,
    resetGame,
    deckInfo,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
