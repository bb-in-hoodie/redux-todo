import { Todo } from "./todo";

export class TodoList {
  name: string;
  createdAt: string; // ISO format date
  lastModifiedAt: string; // ISO format date
  todos: Todo[];
  dones: Todo[];

  constructor(name: string) {
    const createdAt = new Date().toISOString();

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
