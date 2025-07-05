import { createContext, useReducer, useContext } from "react";
import { likeReducer } from "../reducers";

const LikeContext = createContext(null);

const initialLikeState = {
  likes: [],
};

const LikeProvider = ({ children }) => {
  const [likeState, likeDispatch] = useReducer(likeReducer, initialLikeState);

  return (
    <LikeContext.Provider value={{ likeState, likeDispatch }}>
      {children}
    </LikeContext.Provider>
  );
};

const useLike = () => useContext(LikeContext);

export { LikeProvider, useLike };
