import { DrawCardPayload, GameState } from "@/types/reducer";
import { shuffleCards } from "@/utils/deck.utils";

export const drawCardReducer = (
  state: GameState,
  action: {
    payload: DrawCardPayload;
  }
) => {
  let { available, discard } = state.deck;
  const { cardToDiscard } = action.payload;

  // Add current card to discard if provided
  if (cardToDiscard) {
    discard = [...discard, cardToDiscard];
  }

  // If deck is empty, reshuffle discard pile
  if (available.length === 0) {
    if (discard.length === 0) {
      return {
        ...state,
        currentCard: null,
        deck: { available: [], discard: [] },
      };
    }
    available = shuffleCards(discard);
    discard = [];
  }

  // Draw a random card
  const randomIdx = Math.floor(Math.random() * available.length);
  const selectedCard = available[randomIdx];
  const newAvailable = available.filter((_, idx) => idx !== randomIdx);

  return {
    ...state,
    deck: { available: newAvailable, discard },
    currentCard: selectedCard,
  };
};
