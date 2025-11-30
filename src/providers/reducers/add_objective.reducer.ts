import { AddObjectivesPayload, GameState } from "@/types/reducer";
import { filterNewObjectives } from "@/utils/deck.utils";

export const addObjectiveReducer = (
  state: GameState,
  action: { payload: AddObjectivesPayload }
): GameState => {
  return {
    ...state,
    objectives: [
      ...state.objectives,
      ...filterNewObjectives(state.objectives, action.payload).map((o) => ({
        ...o,
        completed: false,
      })),
    ],
  };
};
