import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { PageHeader, VideoCard } from "../../components";
import { useAuth } from "../../contexts";

export const SinglePlaylist = () => {
  const { playlistId } = useParams();
  const {
    userData: { token },
  } = useAuth();

  const [singlePlaylist, setSinglePlaylist] = useState({});
  const [pageLoader, setPageLoader] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setPageLoader(true);
        const { data, status } = await axios({
          method: "GET",
          url: `/api/user/playlists/${playlistId}`,
          headers: { authorization: token },
        });
        if (status === 200) {
          setSinglePlaylist(data.playlist);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setPageLoader(false);
      }
    })();
  }, [playlistId, token]);

  const pageHeaderDetails = {
    pageTitle: singlePlaylist.title,
    subTitle: "video",
    state: singlePlaylist?.videos,
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
      <main className="main-container main-min-height">
        <PageHeader pageHeaderDetails={pageHeaderDetails} />
        <div className="grid-minmax-card m-4">
          {singlePlaylist?.videos &&
            singlePlaylist.videos.map((videos) => {
              const singlePlaylistProps = {
                singlePlaylist,
                setSinglePlaylist,
                playlistId,
              };
              return (
                <VideoCard
                  key={videos._id}
                  videos={videos}
                  trashIcon={{ trashIcon: true }}
                  videoType="singlePlaylist"
                  singlePlaylistProps={singlePlaylistProps}
                />
              );
            })}
        </div>
      </main>
    </>
  );
};
