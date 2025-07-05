import axios from "axios";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { PageHeader, VideoCard } from "../../components";
import { useAuth } from "../../contexts";

export const WatchLater = () => {
  const {
    userData: { token },
  } = useAuth();

  const [watchlaterVideos, setWatchlaterVideos] = useState([]);
  const [pageLoader, setPageLoader] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setPageLoader(true);
        const { data, status } = await axios({
          method: "GET",
          url: "/api/user/watchlater",
          headers: { authorization: token },
        });
        if (status === 200) {
          setWatchlaterVideos(data.watchlater);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setPageLoader(false);
      }
    })();
  }, [token]);

  const pageHeaderDetails = {
    pageTitle: "Watch Later",
    subTitle: "video",
    state: watchlaterVideos,
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
          {watchlaterVideos.map((videos) => {
            const watchlaterProps = {
              watchlaterVideos,
              setWatchlaterVideos,
            };
            return (
              <VideoCard
                key={videos._id}
                videos={videos}
                trashIcon={{ trashIcon: true }}
                videoType="watchlater"
                watchlaterProps={watchlaterProps}
              />
            );
          })}
        </div>
      </main>
    </>
  );
};
