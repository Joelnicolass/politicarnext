import { GameState, SetPreviewPayload } from "@/types/reducer";

export const setPreviewReducer = (
  state: GameState,
  action: { payload: SetPreviewPayload }
): GameState => {
  return {
    ...state,
    previewSide: action.payload,
  };
};
