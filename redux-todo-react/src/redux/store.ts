import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "./reducers/todoListReducer";

const store = configureStore({
  reducer: {
    todoList: todoListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
