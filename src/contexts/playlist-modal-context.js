import { createContext, useContext, useReducer } from "react";
import { playlistModalReducer } from "../reducers";

const PlaylistModalContext = createContext(null);

const initialPlaylistModalState = {
  isActive: false,
  video: {},
};

const PlaylistModalProvider = ({ children }) => {
  const [playlistModalState, playlistModalDispatch] = useReducer(
    playlistModalReducer,
    initialPlaylistModalState
  );
  return (
    <PlaylistModalContext.Provider
      value={{ playlistModalState, playlistModalDispatch }}
    >
      {children}
    </PlaylistModalContext.Provider>
  );
};

const usePlaylistModal = () => useContext(PlaylistModalContext);

export { PlaylistModalProvider, usePlaylistModal };
