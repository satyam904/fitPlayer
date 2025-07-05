import { constants } from "../utils";

export const watchLaterReducer = (state, { type, payload }) => {
  switch (type) {
    case constants.TOGGLE_WATCH_LATER:
      return { ...state, watchLater: payload.toggle_watch_later };

    default:
      return state;
  }
};
