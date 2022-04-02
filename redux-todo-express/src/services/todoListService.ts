import { getCollection } from "../db/mongo";
import { TodoList } from "../types/todoList";

export async function findTodoListByName(name: string) {
  const collection = await getCollection();
  const query = { name };
  return collection.findOne(query);
}

export async function countTodoListByName(name: string) {
  const collection = await getCollection();
  const query = { name };
  return collection.count(query);
}

export async function createTodoList(todoList: TodoList) {
  const collection = await getCollection();
  return collection.insertOne(todoList);
}

export async function updateTodoList(name: string, todoList: TodoList) {
  const collection = await getCollection();

  // should query with current name, not with the updated one
  const query = { name };
  return collection.findOneAndReplace(query, todoList);
}

export async function deleteTodoListByName(name: string) {
  const collection = await getCollection();
  const query = { name };
  return collection.deleteOne(query);
}
