import { constants } from "../utils";

export const likeReducer = (state, { type, payload }) => {
  switch (type) {
    case constants.TOGGLE_LIKE:
      return { ...state, likes: payload.toggle_like };
    default:
      return state;
  }
};
