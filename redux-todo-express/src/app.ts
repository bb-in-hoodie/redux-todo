import express from "express";
import { closeClient, getCollection } from "./db/mongo";
import { TodoList } from "./types/todoList";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});

app.get("/", async (req, res) => {
  const collection = await getCollection();
  res.json({ message: "OK" });
});

// close MongoClient when shutting down the app (https://stackoverflow.com/a/63419186/6864219)
const cleanup = async () => {
  console.log('Cleaning up');
  await closeClient();
  process.exit();
}

process.on('SIGINT', cleanup); // Interrupt from keyboard
process.on('SIGTERM', cleanup); // Termination signal
