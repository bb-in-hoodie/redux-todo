import { v4 as uuidV4 } from "uuid";

export class Todo {
  uuid: string;
  content: string;
  createdAt: string;
  lastModifiedAt: string;

  constructor(
    uuid: string,
    content: string,
    createdAt: string,
    lastModifiedAt: string
  ) {
    this.uuid = uuid;
    this.content = content;
    this.createdAt = createdAt;
    this.lastModifiedAt = lastModifiedAt;
  }

  static createTodo(content: string) {
    const uuid = uuidV4();
    const now = new Date().toISOString();
    return new Todo(uuid, content, now, now);
  }
}
