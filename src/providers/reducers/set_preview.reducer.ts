import { GameState, SetPreviewPayload } from "@/types/reducer";

export const setPreviewReducer = (
  state: GameState,
  action: { payload: SetPreviewPayload }
): GameState => {
  const previewSide = action.payload;

  // Calculate diffs based on preview side
  let previewDiffs: [number, number, number, number] = [0, 0, 0, 0];

  if (previewSide && state.currentCard) {
    const choice =
      previewSide === "left" ? state.currentCard.left : state.currentCard.right;
    previewDiffs = choice.effect;
  }

  return {
    ...state,
    previewSide,
    previewDiffs,
  };
};
