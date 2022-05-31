import { createSlice } from "@reduxjs/toolkit";
import AppState from "../../types/appState";

const appStateSlice = createSlice({
  name: "appState",
  initialState: new AppState(),
  reducers: {
    setPollingTimeoutId: (state, action) => {
      state.pollingTimeoutId = action.payload;
    },
    clearPollingTimeout: (state) => {
      if (state.pollingTimeoutId) {
        clearTimeout(state.pollingTimeoutId);
      }
    },
  },
});

const { actions, reducer } = appStateSlice;
export const { setPollingTimeoutId, clearPollingTimeout } = actions;
export default reducer;
