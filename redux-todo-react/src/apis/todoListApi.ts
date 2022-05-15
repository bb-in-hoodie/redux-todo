import { DEFAULT_TODO_LIST, TodoList } from "../types/todoList";
import axiosInsance from "./axiosInstance";

export function getTodoList(name = DEFAULT_TODO_LIST) {
  return axiosInsance.get<TodoList>(`/todo-lists/${name}`);
}
