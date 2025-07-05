import { constants } from "../utils";

export const videoReducer = (state, { type, payload }) => {
  switch (type) {
    case constants.INITIALISE_VIDEOS:
      return { ...state, videos: payload.initialise_videos };

    default:
      return state;
  }
};
