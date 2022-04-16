import { Todo } from "./todo";

export class TodoList {
  name: string;
  createdAt: Date;
  lastModifiedAt: Date;
  todos: Todo[];
  dones: Todo[];

  constructor(
    name: string,
    createdAtIsoString: string,
    lastModifiedAtIsoString: string,
    todos: Todo[],
    dones: Todo[]
  ) {
    this.name = name;
    this.createdAt = new Date(createdAtIsoString);
    this.lastModifiedAt = new Date(lastModifiedAtIsoString);
    this.todos = todos;
    this.dones = dones;
  }
}
