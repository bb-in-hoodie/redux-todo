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
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    addDone: (state, action) => {
      state.dones.push(action.payload);
    },
    setAsDone: (state, action) => {
      const indexToRemove = state.todos.findIndex(
        (todo) => todo.uuid === action.payload.uuid
      );
      state.todos.splice(indexToRemove, 1);
      state.dones.push(action.payload);
    },
    setAsTodo: (state, action) => {
      const indexToRemove = state.dones.findIndex(
        (todo) => todo.uuid === action.payload.uuid
      );
      state.dones.splice(indexToRemove, 1);
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      const indexToRemove = state.todos.findIndex(
        (todo) => todo.uuid === action.payload.uuid
      );
      state.todos.splice(indexToRemove, 1);
    },
    removeDone: (state, action) => {
      const indexToRemove = state.dones.findIndex(
        (todo) => todo.uuid === action.payload.uuid
      );
      state.dones.splice(indexToRemove, 1);
    },
    moveTodo: (state, action) => {
      const { todo, amount } = action.payload;
      const indexToMove = state.todos.findIndex(
        (todoEl) => todoEl.uuid === todo.uuid
      );
      state.todos.splice(indexToMove, 1); // remove
      state.todos.splice(indexToMove + amount, 0, todo); // insert
    },
  },
});

const { actions, reducer } = todoListSlice;
export const {
  setName,
  setCreatedAt,
  setLastModifiedAt,
  setTodos,
  setDones,
  addTodo,
  addDone,
  setAsDone,
  setAsTodo,
  removeTodo,
  removeDone,
  moveTodo,
} = actions;
export default reducer;
