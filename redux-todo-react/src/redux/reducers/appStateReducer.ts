import { createSlice } from "@reduxjs/toolkit";
import AppState from "../../types/appState";

const appStateSlice = createSlice({
  name: "appState",
  initialState: new AppState(),
  reducers: {
    updatePollingTimeoutId: (state, action) => {
      // if there is a scheduled polling, cancel it
      if (state.pollingTimeoutId) {
        clearTimeout(state.pollingTimeoutId);
      }

      // update timeoutId
      state.pollingTimeoutId = action.payload;
    },
    setIsSyncingWithDb: (state, action) => {
      state.isSyncingWithDb = action.payload;
    },
  },
});

const { actions, reducer } = appStateSlice;
export const { updatePollingTimeoutId, setIsSyncingWithDb } = actions;
export default reducer;
