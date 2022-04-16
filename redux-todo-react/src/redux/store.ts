import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "./reducers/todoListReducer";

const store = configureStore({
  reducer: {
    todoList: todoListReducer,
  },
});

export default store;
