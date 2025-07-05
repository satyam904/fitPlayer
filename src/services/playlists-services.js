import axios from "axios";
import { constants } from "../utils";
import toast from "react-hot-toast";

export const addNewPlaylistHandler = async ({
  e,
  token,
  newPlaylist,
  playlistDispatch,
}) => {
  e.preventDefault();
  try {
    const { data, status } = await axios({
      method: "POST",
      url: "/api/user/playlists",
      headers: { authorization: token },
      data: { playlist: { title: newPlaylist } },
    });
    if (status === 201) {
      playlistDispatch({
        type: constants.UPDATE_PLAYLISTS,
        payload: { update_playlist: data.playlists },
      });
      toast.success("New playlist created");
    }
  } catch (e) {
    console.error(e);
  }
};

export const deletePlaylistHandler = async ({
  playlistId,
  token,
  setDisableBtn,
  playlistDispatch,
}) => {
  try {
    setDisableBtn(true);
    const { data, status } = await axios({
      method: "DELETE",
      url: `/api/user/playlists/${playlistId}`,
      headers: { authorization: token },
    });

    if (status === 200) {
      setDisableBtn(false);
      playlistDispatch({
        type: constants.DELETE_PLAYLIST,
        payload: { delete_playlist: data.playlists },
      });
      toast.success("Playlist successfully deleted");
    }
  } catch (e) {
    console.error(e);
  }
};

export const addVideoToPlaylistHandler = async ({
  playlistId,
  token,
  video,
  playlistDispatch,
}) => {
  try {
    const { data, status } = await axios({
      method: "POST",
      url: `/api/user/playlists/${playlistId}`,
      headers: { authorization: token },
      data: { video },
    });

    if (status === 201) {
      toast.success("Video successfully added");
      playlistDispatch({
        type: constants.TOGGLE_PLAYLIST_VIDEO,
        payload: { playlist: data.playlists },
      });
    }
  } catch (e) {
    console.error(e);
  }
};

export const removeVideoFromPlaylistHandler = async ({
  playlistId,
  token,
  videoId,
  playlistDispatch,
  singlePlaylist,
  setSinglePlaylist,
  setDisableBtn,
}) => {
  try {
    setDisableBtn && setDisableBtn(true);
    const { data, status } = await axios({
      method: "DELETE",
      url: `/api/user/playlists/${playlistId}/${videoId}`,
      headers: { authorization: token },
    });
    if (status === 200) {
      setDisableBtn && setDisableBtn(false);
      playlistDispatch({
        type: constants.TOGGLE_PLAYLIST_VIDEO,
        payload: { playlist: data.playlists },
      });
      setSinglePlaylist &&
        setSinglePlaylist({
          ...singlePlaylist,
          videos: singlePlaylist?.videos.filter(({ _id }) => _id !== videoId),
        });
      toast.success("Video successfully removed");
    }
  } catch (e) {
    console.error(e);
  }
};
