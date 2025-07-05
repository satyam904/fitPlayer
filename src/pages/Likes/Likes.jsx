import React from "react";
import { PageHeader, VideoCard } from "../../components";
import { useLike } from "../../contexts";

export const Likes = () => {
  const {
    likeState: { likes },
  } = useLike();

  const pageHeaderDetails = {
    pageTitle: "Likes",
    subTitle: "video",
    state: likes,
  };

  return (
    <>
      <main className="main-container main-min-height">
        <PageHeader pageHeaderDetails={pageHeaderDetails} />
        <div className="grid-minmax-card m-4">
          {likes.map((videos) => {
            return (
              <VideoCard
                key={videos._id}
                videos={videos}
                trashIcon={{ trashIcon: true }}
                videoType="likes"
              />
            );
          })}
        </div>
      </main>
    </>
  );
};
