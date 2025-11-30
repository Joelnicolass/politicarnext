import { GameState, ResetGamePayload } from "@/types/reducer";
import { INITIAL_STATS } from "../game_manager.provider";
import { shuffleCards } from "@/utils/deck.utils";

export const resetGameReducer = (
  state: GameState,
  action: { payload: ResetGamePayload }
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
      previewSide: null,
      characters: action.payload.characters,
    };
  }

  const randomIdx = Math.floor(Math.random() * shuffledDeck.length);
  const firstCard = shuffledDeck[randomIdx];
  const remainingDeck = shuffledDeck.filter((_, idx) => idx !== randomIdx);

  return {
    turns: 0,
    deck: { available: remainingDeck, discard: [] },
    currentCard: firstCard,
    stats: INITIAL_STATS,
    gameOver: null,
    activeEffects: [],
    objectives: action.payload.objectives,
    allObjectivesCompleted: false,
    turnLog: null,
    previewSide: null,
    characters: action.payload.characters,
    addedDeckIds: new Set(), // Reset tracking on game reset
  };
};
