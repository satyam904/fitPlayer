import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChipSection, VideoCard } from "../../components";
import { useVideo } from "../../contexts";
import { constants, filterByCategory } from "../../utils";
import "./Videos.css";

export const Videos = () => {
  const {
    videoState: { videos },
    videoDispatch,
  } = useVideo();

  const [selectCategory, setSelectCategory] = useState("All");

  useEffect(() => {
    (async () => {
      try {
        const { data, status } = await axios({
          method: "GET",
          url: "/api/videos",
        });

        if (status === 200) {
          videoDispatch({
            type: constants.INITIALISE_VIDEOS,
            payload: { initialise_videos: data.videos },
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
      }
    })();
  }, [videoDispatch]);

  const filteredVideos =
    selectCategory === "All"
      ? videos
      : filterByCategory(selectCategory, videos);

  return (
    <>
      <main className="main-container">
        <div className="m-3 container-flex chip-section">
          <ChipSection
            selectCategory={selectCategory}
            setSelectCategory={setSelectCategory}
          />
        </div>
        <div className="grid-minmax-card m-4">
          {filteredVideos.map((videos) => {
            return <VideoCard key={videos._id} videos={videos} />;
          })}
        </div>
      </main>
    </>
  );
};
