import { v4 as uuidV4 } from "uuid";
import { Todo } from "./todo";

export class TodoList {
  uuid: string;
  name: string;
  createdAt: string; // ISO format date
  lastModifiedAt: string; // ISO format date
  todos: Todo[];
  dones: Todo[];

  constructor(name: string, uuid = uuidV4()) {
    const createdAt = new Date().toISOString();

    this.uuid = uuid;
    this.name = name;
    this.createdAt = createdAt;
    this.lastModifiedAt = createdAt;
    this.todos = [];
    this.dones = [];
  }

  static validate(todoList?: TodoList) {
    if (!todoList) {
      return false;
    }
    
    const { name, createdAt, lastModifiedAt, todos, dones } = todoList;
    return name.trim() && createdAt && lastModifiedAt && todos && dones;
  }
}

export const DEFAULT_TODO_LIST = "default";
