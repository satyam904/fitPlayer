import React from "react";
import { usePlaylist } from "../../contexts";
import { PageHeader, PlaylistCard } from "../../components";

export const Playlists = () => {
  const {
    playlistState: { playlists },
  } = usePlaylist();

  const pageHeaderDetails = {
    pageTitle: "Playlists",
    subTitle: "playlist",
    state: playlists,
  };

  return (
    <>
      <main className="main-container main-min-height">
        <PageHeader pageHeaderDetails={pageHeaderDetails} />
        <div className="grid-minmax-card m-4">
          {playlists.map((playlists) => {
            return <PlaylistCard key={playlists._id} playlists={playlists} />;
          })}
        </div>
      </main>
    </>
  );
};
