import { createContext, useContext, useReducer } from "react";
import { watchLaterReducer } from "../reducers";

const WatchLaterContex = createContext(null);

const initialWatchLaterState = {
  watchLater: [],
};

const WatchLaterProvider = ({ children }) => {
  const [watchLaterState, watchLaterDispatch] = useReducer(
    watchLaterReducer,
    initialWatchLaterState
  );

  return (
    <WatchLaterContex.Provider value={{ watchLaterState, watchLaterDispatch }}>
      {children}
    </WatchLaterContex.Provider>
  );
};

const useWatchLater = () => useContext(WatchLaterContex);

export { WatchLaterProvider, useWatchLater };
