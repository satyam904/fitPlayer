import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { RiPlayListAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAuth, usePlaylist } from "../../contexts";
import { deletePlaylistHandler } from "../../services";
import "./PlaylistCard.css";

export const PlaylistCard = ({ playlists }) => {
  const { _id, title, videos } = playlists;
  const {
    userData: { token },
  } = useAuth();
  const { playlistDispatch } = usePlaylist();
  const navigate = useNavigate();

  const [disableBtn, setDisableBtn] = useState(false);

  return (
    <>
      <div key={_id} className="playlist-card radius-5">
        <div className="playlist-card-body p-2">
          <div
            onClick={() => navigate(`/playlists/${_id}`)}
            className="playlist-card-img-overlay cursor-pointer"
          >
            <div className="playlist-overlay-text container-flex-center">
              <span className="medium-text">{videos.length}</span>
              <span className="playlist-icon">
                <RiPlayListAddFill />
              </span>
            </div>
          </div>
          <div className="playlist-card-actions pt-2 container-flex">
            <h6 className="h6">{title}</h6>
            <button
              onClick={() =>
                deletePlaylistHandler({
                  playlistId: _id,
                  token,
                  setDisableBtn,
                  playlistDispatch,
                })
              }
              className="trash-btn-icon cursor-pointer"
              disabled={disableBtn}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
