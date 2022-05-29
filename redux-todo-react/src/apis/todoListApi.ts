import {
  DEFAULT_TODO_LIST,
  TodoList,
  TodoListUpdateResponse,
} from "../types/todoList";
import axiosInsance from "./axiosInstance";

export function getTodoList(name = DEFAULT_TODO_LIST) {
  return axiosInsance.get<TodoList>(`/todo-lists/${name}`);
}

export function updateTodoList(todoList: TodoList, name = DEFAULT_TODO_LIST) {
  const payload = { ...todoList };
  // eslint-disable-next-line dot-notation
  delete payload["_id"];

  return axiosInsance.put<TodoListUpdateResponse>(
    `/todo-lists/${name}`,
    payload
  );
}
