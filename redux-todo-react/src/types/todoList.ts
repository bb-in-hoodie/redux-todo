import { immerable } from "immer";
import { Todo } from "./todo";

export const DEFAULT_TODO_LIST = "default";

export class TodoList {
  [immerable] = true; // needed to use a class in Redux

  _id?: string; // only managed by mongodb
  uuid: string;
  name: string;
  createdAt: string;
  lastModifiedAt: string;
  todos: Todo[];
  dones: Todo[];

  constructor(
    uuid: string,
    name: string,
    createdAt: string,
    lastModifiedAt: string,
    todos: Todo[],
    dones: Todo[]
  ) {
    this.uuid = uuid;
    this.name = name;
    this.createdAt = createdAt;
    this.lastModifiedAt = lastModifiedAt;
    this.todos = todos;
    this.dones = dones;
  }

  static createEmptyTodoList() {
    const now = new Date().toISOString();
    return new TodoList("", "", now, now, [], []);
  }
}

export interface TodoListUpdateResponse {
  message: string;
  foundBy: { name: string };
  original: TodoList;
  updated: TodoList;
}
