import { createContext, useContext, useReducer } from "react";
import { historyReducer } from "../reducers";

const HistoryContext = createContext(null);

const initialHistoryState = {
  history: [],
};

const HistoryProvider = ({ children }) => {
  const [historyState, historyDispatch] = useReducer(
    historyReducer,
    initialHistoryState
  );

  return (
    <HistoryContext.Provider value={{ historyState, historyDispatch }}>
      {children}
    </HistoryContext.Provider>
  );
};

const useHistory = () => useContext(HistoryContext);

export { HistoryProvider, useHistory };
