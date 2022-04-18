import { immerable } from "immer";
import { Todo } from "./todo";

export class TodoList {
  [immerable] = true; // needed to use a class in Redux

  uuid: string;
  name: string;
  createdAt: Date;
  lastModifiedAt: Date;
  todos: Todo[];
  dones: Todo[];

  constructor(
    uuid: string,
    name: string,
    createdAtIsoString: string,
    lastModifiedAtIsoString: string,
    todos: Todo[],
    dones: Todo[]
  ) {
    this.uuid = uuid;
    this.name = name;
    this.createdAt = new Date(createdAtIsoString);
    this.lastModifiedAt = new Date(lastModifiedAtIsoString);
    this.todos = todos;
    this.dones = dones;
  }

  static createEmptyTodoList() {
    const now = new Date().toISOString();
    return new TodoList("", "", now, now, [], []);
  }
}
