import { GameState, SetPreviewPayload } from "@/types/reducer";
import { applyDifficultyToEffect } from "@/utils/deck.utils";

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
    // Apply difficulty multiplier to preview diffs

    // previewDiffs = choice.effect; -> ByPass difficulty application
    previewDiffs = applyDifficultyToEffect(choice.effect, state.difficulty);
  }

  return {
    ...state,
    previewSide,
    previewDiffs,
  };
};
