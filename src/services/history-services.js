import axios from "axios";
import toast from "react-hot-toast";
import { constants } from "../utils";

export const addToHistory = async ({ token, videos, historyDispatch }) => {
  try {
    const { data, status } = await axios({
      method: "POST",
      url: "/api/user/history",
      headers: { authorization: token },
      data: { video: videos },
    });
    if (status === 201) {
      historyDispatch({
        type: constants.ADD_TO_HISTORY,
        payload: { add_to_history: data.history },
      });
    }
  } catch (e) {
    console.error(e);
  }
};

export const removeFromHistory = async ({
  videoId,
  token,
  historyDispatch,
  setDisableBtn,
  historyVideos,
  setHistoryVideos,
}) => {
  try {
    setDisableBtn(true);
    const { data, status } = await axios({
      method: "DELETE",
      url: `/api/user/history/${videoId}`,
      headers: { authorization: token },
    });
    if (status === 200) {
      historyDispatch({
        type: constants.DELETE_FROM_HISTORY,
        payload: { delete_from_history: data.history },
      });
      setHistoryVideos(historyVideos.filter(({ _id }) => _id !== videoId));
      toast.success("Removed from history");
    }
  } catch (e) {
    console.error(e);
  } finally {
    setDisableBtn(false);
  }
};
