import axios from "axios";
import { createContext, useContext, useReducer, useEffect } from "react";
import { playlistReducer } from "../reducers";
import { useAuth } from "../contexts";
import { constants } from "../utils";

const PlaylistContext = createContext(null);

const initialPlaylistState = {
  playlists: [],
};

const PlaylistProvider = ({ children }) => {
  const [playlistState, playlistDispatch] = useReducer(
    playlistReducer,
    initialPlaylistState
  );

  const {
    userData: { token },
  } = useAuth();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const { data, status } = await axios({
            method: "GET",
            url: "/api/user/playlists",
            headers: { authorization: token },
          });
          if (status === 200) {
            playlistDispatch({
              type: constants.INITIALISE_PLAYLISTS,
              payload: { initialise_playlists: data.playlists },
            });
          }
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [token]);

  return (
    <PlaylistContext.Provider value={{ playlistState, playlistDispatch }}>
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);

export { PlaylistProvider, usePlaylist };
