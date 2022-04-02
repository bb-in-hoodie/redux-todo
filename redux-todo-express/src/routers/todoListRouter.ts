import express from "express";
import {
  countTodoListByName,
  createTodoList,
  deleteTodoListByName,
  findTodoListByName,
  updateTodoList,
} from "../services/todoListService";
import { TodoList } from "../types/todoList";

const router = express.Router();

// utils
function trimName(name?: string) {
  return name?.trim() ?? null;
}

/**
 * preceeding path: "/todo-lists"
 */

// GET "/todo-lists/{name}"
// - find a todo list by the given name
router.get("/:name", async (req, res) => {
  const name = trimName(req.params.name);

  // path validation
  if (!name) {
    res.status(404).json({ error: `invalid todo list name` });
    return;
  }

  try {
    const result = await findTodoListByName(name);
    if (result) {
      res.status(200).json(result);
    } else {
      res
        .status(404)
        .json({ error: `failed to find a todo list with the given name`, name });
    }
  } catch (e) {
    res.status(500).json({
      error: "failed to find a todo list due to a server error",
      message: (e as any).message ?? undefined,
    });
  }
});

// POST "/todo-lists/{name}"
// - create a new todo list with the given name
router.post("/:name", async (req, res) => {
  const name = trimName(req.params.name);

  // path validation
  if (!name) {
    res.status(404).json({ error: `invalid todo list name` });
    return;
  }

  const count = await countTodoListByName(name);
  if (count > 0) {
    res.status(404).json({ error: `the name is already in use`, name });
    return;
  }

  try {
    const todoList = new TodoList(name);
    await createTodoList(todoList);
    res
      .status(200)
      .json({ message: `created a todo list with the given name`, name });
  } catch (e) {
    res.status(500).json({
      error: "failed to create a todo list due to a server error",
      message: (e as any).message ?? undefined,
    });
  }
});

// PUT "/todo-lists/{name}"
// - body: TodoList
// - update a todo list
router.put("/:name", async (req, res) => {
  const name = trimName(req.params.name);

  // path validation
  if (!name) {
    res.status(404).json({ error: `invalid todo list name` });
    return;
  }

  const countByOriginalName = await countTodoListByName(name);
  if (countByOriginalName <= 0) {
    res
      .status(404)
      .json({ error: `failed to find a todo list with the given name`, name });
    return;
  }

  // body validation
  const todoList = req.body;
  if (todoList?.name) {
    todoList.name = trimName(todoList.name); // if possible, trim the updated name first
  }

  if (!TodoList.validate(todoList)) {
    res.status(404).json({ error: `invalid request body` });
    return;
  }

  const countByUpdatedName = await countTodoListByName(todoList.name);
  if (name !== todoList.name) {
    if (countByUpdatedName > 0) {
      res.status(404).json({
        error: `the updated name is already in use`,
        updatedName: todoList.name,
      });
      return;
    }
  }

  try {
    // update 'lastModifiedAt' value and apply the udpate
    todoList.lastModifiedAt = new Date().toISOString();
    const { value } = await updateTodoList(name, todoList);
    const original = { ...value };
    delete original["_id"];

    res.status(200).json({
      message: `updated a todo list`,
      foundBy: { name },
      original,
      updated: todoList,
    });
  } catch (e) {
    res.status(500).json({
      error: "failed to update a todo list due to a server error",
      message: (e as any).message ?? undefined,
    });
  }
});

// DELETE "/todo-lists/{name}"
// - delete a todo list with the given name
router.delete("/:name", async (req, res) => {
  const name = trimName(req.params.name);

  // path validation
  if (!name) {
    res.status(404).json({ error: `invalid todo list name` });
    return;
  }

  const count = await countTodoListByName(name);
  if (count <= 0) {
    res
      .status(404)
      .json({ error: `failed to find a todo list with the given name`, name });
    return;
  }

  try {
    await deleteTodoListByName(name);
    res
      .status(200)
      .json({ message: `deleted a todo list with the given name`, name });
  } catch (e) {
    res.status(500).json({
      error: "failed to delete a todo list due to a server error",
      message: (e as any).message ?? undefined,
    });
  }
});

export default router;
