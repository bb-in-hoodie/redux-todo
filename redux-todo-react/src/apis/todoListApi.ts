import debounce from "lodash/debounce";
import {
  DEFAULT_TODO_LIST,
  TodoList,
  TodoListUpdateResponse,
} from "../types/todoList";
import axiosInsance from "./axiosInstance";

const UPDATE_WAITING_TIME = 3 * 1000; // in milliseconds

export function getTodoList(name = DEFAULT_TODO_LIST) {
  return axiosInsance.get<TodoList>(`/todo-lists/${name}`);
}

export function getLastModifiedAt(name = DEFAULT_TODO_LIST) {
  return axiosInsance.get<Pick<TodoList, "lastModifiedAt">>(
    `/todo-lists/${name}/last-modified-at`
  );
}

function updateTodoList(todoList: TodoList, name = DEFAULT_TODO_LIST) {
  const payload = { ...todoList };
  // eslint-disable-next-line dot-notation
  delete payload["_id"];

  return axiosInsance.put<TodoListUpdateResponse>(
    `/todo-lists/${name}`,
    payload
  );
}

export const debouncedUpdateTodoList = debounce(
  updateTodoList,
  UPDATE_WAITING_TIME,
  {
    leading: true,
  }
);
