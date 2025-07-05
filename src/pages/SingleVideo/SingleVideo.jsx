import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { RiPlayListAddFill } from "react-icons/ri";
import { BsFillClockFill } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import {
  addToWatchLaterHandler,
  dislikeHandler,
  likeHandler,
  removeFromWatchLaterHandler,
} from "../../services";
import {
  useAuth,
  useLike,
  usePlaylistModal,
  useWatchLater,
} from "../../contexts";
import {
  constants,
  isAlreadyInLikes,
  isAlreadyInWatchLater,
} from "../../utils";
import "./SingleVideo.css";

export const SingleVideo = () => {
  const { videoId } = useParams();
  const [singleVideo, setSingleVideo] = useState({});
  const [pageLoader, setPageLoader] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const {
    userData: { token },
  } = useAuth();
  const {
    likeState: { likes },
    likeDispatch,
  } = useLike();
  const {
    watchLaterState: { watchLater },
    watchLaterDispatch,
  } = useWatchLater();
  const { playlistModalDispatch } = usePlaylistModal();
  const navigate = useNavigate();

  const { _id, creator, creatorDp, description, title } = singleVideo;

  useEffect(() => {
    (async () => {
      try {
        setPageLoader(true);
        const { data, status } = await axios({
          method: "GET",
          url: `/api/video/${videoId}`,
        });
        if (status === 200) {
          setSingleVideo(data.video);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setPageLoader(false);
      }
    })();
  }, [videoId]);

  const isLiked = isAlreadyInLikes(likes, singleVideo);
  const inWatchLater = isAlreadyInWatchLater(watchLater, singleVideo);

  const likeClickHandler = () => {
    if (token) {
      isLiked
        ? dislikeHandler({ videoId: _id, token, likeDispatch, setDisableBtn })
        : likeHandler({
            singleVideo,
            token,
            likeDispatch,
            setDisableBtn,
          });
    } else {
      navigate("/login", { replace: true });
    }
  };

  const watchlaterHandler = () => {
    if (token) {
      inWatchLater
        ? removeFromWatchLaterHandler({
            videoId: _id,
            token,
            watchLaterDispatch,
            setDisableBtn,
          })
        : addToWatchLaterHandler({
            token,
            video: singleVideo,
            watchLaterDispatch,
            setDisableBtn,
          });
    } else {
      navigate("/login", { replace: true });
    }
  };

  const playlistHandler = () => {
    if (token) {
      playlistModalDispatch({
        type: constants.OPEN_P_MODAL,
        payload: { open_modal: true, get_video: singleVideo },
      });
    } else {
      navigate("/login", { replace: true });
    }
  };

  if (pageLoader) {
    return (
      <>
        <main className="main-container container-flex-center main-min-height">
          <ClipLoader color="#ef6236" speedMultiplier={2} size={40} />
        </main>
      </>
    );
  }

  return (
    <>
      <main className="p-2 main-container main-min-height">
        <div className="iframe-container">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${singleVideo._id}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3`}
            className="player radius-5"
            title="15 Minute Beginner Weight Training - Easy Exercises - HASfit Beginners Workout Routine - Strength"
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
          ></iframe>
        </div>

        <h4 className="h4 mt-2">{title}</h4>

        <div className="video-details my-2">
          <div className="container-flex-align-center">
            <img
              src={creatorDp}
              alt="avatar"
              className="avatar avatar-sm-size creator-avatar"
            />
            <span className="ml-2">{creator}</span>
          </div>

          <div className="v-controls my-2">
            <button
              onClick={likeClickHandler}
              className={`btn container-flex-center shadow ${
                isLiked && "focus-btn"
              }`}
              disabled={disableBtn}
            >
              <AiFillLike />
              <span className="pl-1">Like</span>
            </button>

            <button
              onClick={playlistHandler}
              className="btn container-flex-center shadow"
            >
              <RiPlayListAddFill />
              <span className="pl-1">Playlist</span>
            </button>

            <button
              onClick={watchlaterHandler}
              className={`btn container-flex-center shadow ${
                inWatchLater && "focus-btn"
              }`}
              disabled={disableBtn}
            >
              <BsFillClockFill />
              <span className="pl-1">Watch Later</span>
            </button>
          </div>

          <div className="py-2 small-text">{description}</div>
        </div>
      </main>
    </>
  );
};
