import { constants } from "../utils";

export const playlistReducer = (state, { type, payload }) => {
  switch (type) {
    case constants.INITIALISE_PLAYLISTS:
      return { ...state, playlists: payload.initialise_playlists };

    case constants.UPDATE_PLAYLISTS:
      return { ...state, playlists: payload.update_playlist };

    case constants.DELETE_PLAYLIST:
      return { ...state, playlists: payload.delete_playlist };

    case constants.TOGGLE_PLAYLIST_VIDEO:
      return { ...state, playlists: payload.playlist };

    default:
      return state;
  }
};
