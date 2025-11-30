import { AddDeckPayload, GameState } from "@/types/reducer";
import {
  filterNewCards,
  filterNewCharacters,
  filterNewObjectives,
} from "@/utils/deck.utils";

export const addDeckReducer = (
  state: GameState,
  action: {
    payload: AddDeckPayload;
  }
) => {
  const { id, cards, characters, objectives } = action.payload;

  // Check if deck was already added
  if (state.addedDeckIds.has(id)) return state;

  // Add deck ID to tracking set
  const newAddedDeckIds = new Set(state.addedDeckIds);
  newAddedDeckIds.add(id);

  // Build new state with added content
  let newState = {
    ...state,
    addedDeckIds: newAddedDeckIds,
    deck: {
      ...state.deck,
      available: [
        ...state.deck.available,
        ...filterNewCards(state.deck.available, cards),
      ],
    },
  };

  // Add characters if provided
  if (characters) {
    newState = {
      ...newState,
      characters: {
        ...newState.characters,
        ...filterNewCharacters(newState.characters, characters),
      },
    };
  }

  if (objectives) {
    newState = {
      ...newState,
      objectives: [
        ...newState.objectives,
        ...filterNewObjectives(newState.objectives, objectives).map((o) => ({
          ...o,
          completed: false,
        })),
      ],
    };
  }

  return newState;
};
