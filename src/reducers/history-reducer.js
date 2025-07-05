import { constants } from "../utils";

export const historyReducer = (state, { type, payload }) => {
  switch (type) {
    case constants.ADD_TO_HISTORY:
      return { ...state, history: payload.add_to_history };

    case constants.DELETE_FROM_HISTORY:
      return { ...state, history: payload.delete_from_history };

    default:
      return state;
  }
};
