import axios from "axios";
import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { PageHeader, VideoCard } from "../../components";
import { useAuth } from "../../contexts";

export const History = () => {
  const {
    userData: { token },
  } = useAuth();

  const [historyVideos, setHistoryVideos] = useState([]);
  const [pageLoader, setPageLoader] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setPageLoader(true);
        const { data, status } = await axios({
          method: "GET",
          url: "/api/user/history",
          headers: { authorization: token },
        });
        if (status === 200) {
          setHistoryVideos(data.history);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setPageLoader(false);
      }
    })();
  }, [token]);

  const pageHeaderDetails = {
    pageTitle: "History",
    subTitle: "video",
    state: historyVideos,
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
          {historyVideos.map((videos) => {
            const historyProps = {
              historyVideos,
              setHistoryVideos,
            };
            return (
              <VideoCard
                key={videos._id}
                videos={videos}
                trashIcon={{ trashIcon: true }}
                videoType="history"
                historyProps={historyProps}
              />
            );
          })}
        </div>
      </main>
    </>
  );
};
