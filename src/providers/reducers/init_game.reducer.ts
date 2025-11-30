import { CardData, Objective } from "@/types";
import { Action, GameState } from "@/types/reducer";
import { INITIAL_STATS } from "../game_manager.provider";
import { shuffleCards } from "@/utils/deck.utils";

export const initGameActionReducer = (
  state: GameState,
  action: {
    type: Action.INIT_GAME;
    payload: { initialCards: CardData[]; objectives: Objective[] };
  }
): GameState => {
  const shuffledDeck = shuffleCards(action.payload.initialCards);

  // Draw first card
  if (shuffledDeck.length === 0) {
    return {
      ...state,
      deck: { available: [], discard: [] },
      currentCard: null,
      objectives: action.payload.objectives,
      turns: 0,
      stats: INITIAL_STATS,
      gameOver: null,
      activeEffects: [],
      turnLog: null,
      allObjectivesCompleted: false,
    };
  }

  const randomIdx = Math.floor(Math.random() * shuffledDeck.length);
  const firstCard = shuffledDeck[randomIdx];
  const remainingDeck = shuffledDeck.filter((_, idx) => idx !== randomIdx);

  return {
    ...state,
    deck: { available: remainingDeck, discard: [] },
    currentCard: firstCard,
    objectives: action.payload.objectives,
    turns: 0,
    stats: INITIAL_STATS,
    gameOver: null,
    activeEffects: [],
    turnLog: null,
    allObjectivesCompleted: false,
    addedDeckIds: new Set(), // Reset tracking
  };
};
