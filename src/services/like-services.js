import axios from "axios";
import { constants } from "../utils";
import toast from "react-hot-toast";

export const likeHandler = async ({
  singleVideo,
  token,
  likeDispatch,
  setDisableBtn,
}) => {
  try {
    setDisableBtn(true);
    const { data, status } = await axios({
      method: "POST",
      url: "/api/user/likes",
      headers: { authorization: token },
      data: { video: singleVideo },
    });
    if (status === 201) {
      likeDispatch({
        type: constants.TOGGLE_LIKE,
        payload: { toggle_like: data.likes },
      });
      toast.success("Added to liked videos");
    }
  } catch (e) {
    console.error(e);
  } finally {
    setDisableBtn(false);
  }
};

export const dislikeHandler = async ({
  videoId,
  token,
  likeDispatch,
  setDisableBtn,
}) => {
  try {
    setDisableBtn(true);
    const { data, status } = await axios({
      method: "DELETE",
      url: `/api/user/likes/${videoId}`,
      headers: { authorization: token },
    });
    if (status === 200) {
      likeDispatch({
        type: constants.TOGGLE_LIKE,
        payload: { toggle_like: data.likes },
      });
      toast.success("Removed from liked videos");
    }
  } catch (e) {
    console.error(e);
  } finally {
    setDisableBtn(false);
  }
};
