import { createSlice } from "@reduxjs/toolkit";
import { TodoList } from "../../types/todoList";

const todoListSlice = createSlice({
  name: "todoList",
  initialState: TodoList.createEmptyTodoList(),
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setCreatedAt: (state, action) => {
      state.createdAt = action.payload;
    },
    setLastModifiedAt: (state, action) => {
      state.lastModifiedAt = action.payload;
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setDones: (state, action) => {
      state.dones = action.payload;
    },
  },
});

const { actions, reducer } = todoListSlice;
export const { setName, setCreatedAt, setLastModifiedAt, setTodos, setDones } =
  actions;
export default reducer;
