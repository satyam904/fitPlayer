import axios from "axios";
import toast from "react-hot-toast";
import { constants } from "../utils";

export const addToWatchLaterHandler = async ({
  token,
  video,
  watchLaterDispatch,
  setDisableBtn,
}) => {
  try {
    setDisableBtn && setDisableBtn(true);
    const { data, status } = await axios({
      method: "POST",
      url: "/api/user/watchlater",
      headers: { authorization: token },
      data: { video },
    });
    if (status === 201) {
      watchLaterDispatch({
        type: constants.TOGGLE_WATCH_LATER,
        payload: { toggle_watch_later: data.watchlater },
      });
      toast.success("Added to watch later");
    }
  } catch (e) {
    console.error(e);
  } finally {
    setDisableBtn && setDisableBtn(false);
  }
};

export const removeFromWatchLaterHandler = async ({
  videoId,
  token,
  watchLaterDispatch,
  setDisableBtn,
  watchlaterVideos,
  setWatchlaterVideos,
}) => {
  try {
    setDisableBtn && setDisableBtn(true);
    const { data, status } = await axios({
      method: "DELETE",
      url: `/api/user/watchlater/${videoId}`,
      headers: { authorization: token },
    });
    if (status === 200) {
      watchLaterDispatch({
        type: constants.TOGGLE_WATCH_LATER,
        payload: { toggle_watch_later: data.watchlater },
      });
      setWatchlaterVideos &&
        setWatchlaterVideos(
          watchlaterVideos.filter(({ _id }) => _id !== videoId)
        );
      toast.success("Removed from watch later");
    }
  } catch (e) {
    console.error(e);
  } finally {
    setDisableBtn && setDisableBtn(false);
  }
};
