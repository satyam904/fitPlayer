import { createContext, useReducer, useContext } from "react";
import { videoReducer } from "../reducers";

const VideoContext = createContext(null);

const initialVideoState = {
  videos: [],
};

const VideoProvider = ({ children }) => {
  const [videoState, videoDispatch] = useReducer(
    videoReducer,
    initialVideoState
  );

  return (
    <VideoContext.Provider value={{ videoState, videoDispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };
