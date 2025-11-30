import { AddCharactersPayload, GameState } from "@/types/reducer";
import { filterNewCharacters } from "@/utils/deck.utils";

export const addCharactersReducer = (
  state: GameState,
  action: { payload: AddCharactersPayload }
): GameState => {
  return {
    ...state,
    characters: {
      ...state.characters,
      ...filterNewCharacters(state.characters, action.payload),
    },
  };
};
