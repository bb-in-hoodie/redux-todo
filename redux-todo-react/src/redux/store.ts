import { configureStore } from "@reduxjs/toolkit";
import { updateDb } from "./middlewares/mongoMiddleware";
import { updateTimestamp } from "./middlewares/timestampMiddleware";
import appStateReducer from "./reducers/appStateReducer";
import todoListReducer from "./reducers/todoListReducer";

const store = configureStore({
  reducer: {
    appState: appStateReducer,
    todoList: todoListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(updateTimestamp)
      .concat(updateDb),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
