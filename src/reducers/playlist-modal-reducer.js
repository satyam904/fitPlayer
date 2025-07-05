import { constants } from "../utils";

export const playlistModalReducer = (state, { type, payload }) => {
  switch (type) {
    case constants.OPEN_P_MODAL:
      return {
        ...state,
        isActive: payload.open_modal,
        video: payload.get_video,
      };

    case constants.CLOSE_P_MODAL:
      return { ...state, isActive: false, video: {} };

    default:
      return state;
  }
};
