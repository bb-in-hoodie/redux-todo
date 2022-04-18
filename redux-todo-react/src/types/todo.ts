import { v4 as uuidV4 } from "uuid";

export class Todo {
  uuid: string;
  content: string;
  createdAt: Date;
  lastModifiedAt: Date;

  constructor(
    uuid: string,
    content: string,
    createdAtIsoString: string,
    lastModifiedAtIsoString: string
  ) {
    this.uuid = uuid;
    this.content = content;
    this.createdAt = new Date(createdAtIsoString);
    this.lastModifiedAt = new Date(lastModifiedAtIsoString);
  }

  static createTodo(content: string) {
    const uuid = uuidV4();
  }
}
