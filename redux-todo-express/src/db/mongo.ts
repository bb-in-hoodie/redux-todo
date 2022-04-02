import { Collection, Db, MongoClient } from "mongodb";
import { DEFAULT_COLLECTION } from "../types/collection";
import { DEFAULT_TODO_LIST, TodoList } from "../types/todoList";

let mongoClient: MongoClient | null = null;
let reduxTodoDb: Db | null = null;
let todoCollection: Collection | null = null;

async function getClient() {
  if (mongoClient) {
    return mongoClient;
  }

  // TODO: use docker-compose internal address
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

export async function getCollection(collectionName = DEFAULT_COLLECTION) {
  // if no collection is fetched yet, read one from db
  if (!todoCollection) {
    const client = await getClient();
    reduxTodoDb = client.db("redux-todo");
    todoCollection = reduxTodoDb.collection(collectionName);
  }

  // if there is no todo list at all, create one
  if (await todoCollection.countDocuments() < 1) {
    await initializeCollection(todoCollection);
  }

  return todoCollection;
}

async function initializeCollection(collection: Collection) {
  // add a default todo list
  const defaultTodoList = new TodoList(DEFAULT_TODO_LIST);

  try {
    console.log(`Creating a default todo list in collection (${collection.collectionName})`);
    return await collection.insertOne(defaultTodoList);
  } catch(e) {
    console.error(`Failed to add a default todo list to collection (${collection.collectionName})`);
    throw e;
  }
}
