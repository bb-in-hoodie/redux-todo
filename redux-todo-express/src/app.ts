import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { closeClient, getCollection } from "./db/mongo";
import todoListRouter from "./routers/todoListRouter";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`timezones by location application is running on port ${port}.`);
});

// middlewares
app.use(cors({ origin: "http://localhost:8080" })); // TODO: set a real origin url
app.use(bodyParser.json()); // parsing application/json

// register routers
app.use("/todo-lists", todoListRouter);

// fallback
app.get("*", (_, res) => {
  res.status(404).send({ error: "invalid request" });
});

// close MongoClient when shutting down the app (https://stackoverflow.com/a/63419186/6864219)
const cleanup = async () => {
  console.log("cleaning up");
  await closeClient();
  process.exit();
};

process.on("SIGINT", cleanup); // Interrupt from keyboard
process.on("SIGTERM", cleanup); // Termination signal
