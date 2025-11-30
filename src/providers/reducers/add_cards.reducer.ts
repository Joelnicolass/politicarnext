import { addCardsPayload, GameState } from "@/types/reducer";
import { filterNewCards } from "@/utils/deck.utils";

export const addCardsReducer = (
  state: GameState,
  action: {
    payload: addCardsPayload;
  }
) => {
  const filteredCards = filterNewCards(state.deck.available, action.payload);
  return {
    ...state,
    deck: {
      ...state.deck,
      available: [...state.deck.available, ...filteredCards],
    },
  };
};
