import { Todo } from "./todo";

export interface TodoList {
  name: string;
  createdAt: string; // ISO format date
  lastModifiedAt: string; // ISO format date
  todos: Todo[];
  dones: Todo[];
}
