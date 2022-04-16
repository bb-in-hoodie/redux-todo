export class Todo {
  content: string;
  createdAt: Date;
  lastModifiedAt: Date;

  constructor(
    content: string,
    createdAtIsoString: string,
    lastModifiedAtIsoString: string
  ) {
    this.content = content;
    this.createdAt = new Date(createdAtIsoString);
    this.lastModifiedAt = new Date(lastModifiedAtIsoString);
  }
}
