import React, { useState } from "react";
import { shortStr } from "../../utils";
import { PopupMenu } from "../../components";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  addToHistory,
  dislikeHandler,
  removeFromHistory,
  removeFromWatchLaterHandler,
  removeVideoFromPlaylistHandler,
} from "../../services";
import {
  useAuth,
  useHistory,
  useLike,
  usePlaylist,
  useWatchLater,
} from "../../contexts";
import "./VideoCard.css";

export const VideoCard = ({
  videos,
  trashIcon,
  videoType,
  singlePlaylistProps,
  watchlaterProps,
  historyProps,
}) => {
  const { _id, creator, creatorDp, thumbnail, title } = videos;
  const navigate = useNavigate();

  const {
    userData: { token },
  } = useAuth();
  const { playlistDispatch } = usePlaylist();
  const { likeDispatch } = useLike();
  const { watchLaterDispatch } = useWatchLater();
  const {
    historyDispatch,
    historyState: { history },
  } = useHistory();

  const [popupMenuActive, setPopupMenuActive] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const deleteHandler = () => {
    switch (videoType) {
      case "singlePlaylist":
        const { playlistId, singlePlaylist, setSinglePlaylist } =
          singlePlaylistProps;
        return removeVideoFromPlaylistHandler({
          playlistId,
          token,
          videoId: _id,
          playlistDispatch,
          singlePlaylist,
          setSinglePlaylist,
          setDisableBtn,
        });

      case "likes":
        return dislikeHandler({
          videoId: _id,
          token,
          likeDispatch,
          setDisableBtn,
        });

      case "watchlater":
        const { watchlaterVideos, setWatchlaterVideos } = watchlaterProps;
        return removeFromWatchLaterHandler({
          videoId: _id,
          token,
          watchLaterDispatch,
          setDisableBtn,
          watchlaterVideos,
          setWatchlaterVideos,
        });

      case "history":
        const { historyVideos, setHistoryVideos } = historyProps;

        return removeFromHistory({
          videoId: _id,
          token,
          historyDispatch,
          setDisableBtn,
          historyVideos,
          setHistoryVideos,
        });

      default:
        break;
    }
  };

  const videoClickHandler = () => {
    const isALreadyInHistory = history.some((video) => video._id === _id);
    if (token && !isALreadyInHistory) {
      addToHistory({ token, videos, historyDispatch });
    }
    navigate(`/videos/${_id}`);
  };

  return (
    <>
      <div className="video-card radius-5">
        <div onClick={videoClickHandler} className="vcard-head">
          <img
            className="img-responsive cursor-pointer"
            src={thumbnail}
            alt="thumbnail"
          />
        </div>
        <div className="vcard-body p-1">
          <h6 className="h6">{shortStr(title)}</h6>
        </div>
        <div className="vcard-footer p-1 container-flex-align-center">
          <img
            src={creatorDp}
            alt="avatar"
            className="avatar avatar-xs-size creator-avatar"
          />
          <span className="ml-2">{shortStr(creator)}</span>
          {trashIcon ? (
            <button
              onClick={deleteHandler}
              className="trash-btn-icon cursor-pointer px-2"
              disabled={disableBtn}
            >
              <FaTrashAlt />
            </button>
          ) : (
            <div className="vcard-menu">
              <i
                onClick={() => setPopupMenuActive(!popupMenuActive)}
                className="bx bx-dots-vertical-rounded cursor-pointer more-icon mr-1 p-1"
              ></i>
              {popupMenuActive && (
                <PopupMenu
                  videos={videos}
                  setPopupMenuActive={setPopupMenuActive}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
