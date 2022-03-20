import { Collection, Db, MongoClient } from "mongodb";

let mongoClient: MongoClient | null = null;
let reduxTodoDb: Db | null = null;
let todoCollection: Collection | null = null;

async function getClient() {
  if (mongoClient) {
    return mongoClient;
  }

  mongoClient = await MongoClient.connect(
    "mongodb://root:redux-todo-mongo@localhost:27017/"
  );
  return mongoClient;
}

export async function closeClient() {
  if (mongoClient) {
    await mongoClient.close();
    mongoClient = null;
    reduxTodoDb = null;
    todoCollection = null;
  }
}

export async function getCollection() {
  if (todoCollection) {
    return todoCollection;
  }

  const client = await getClient();
  reduxTodoDb = client.db("redux-todo");
  todoCollection = reduxTodoDb.collection("todo");
  return todoCollection;
}
