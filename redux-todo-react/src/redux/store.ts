import { configureStore } from "@reduxjs/toolkit";
import { updateDb } from "./middlewares/mongoMiddleware";
import todoListReducer from "./reducers/todoListReducer";

const store = configureStore({
  reducer: {
    todoList: todoListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(updateDb),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
