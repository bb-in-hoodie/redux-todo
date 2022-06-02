import { Middleware } from "@reduxjs/toolkit";
import { setLastModifiedAt } from "../reducers/todoListReducer";

export const updateTimestamp: Middleware =
  (store) => (next) => async (action) => {
    // skip if
    // - it's not todoList related action
    // - it's initializing process (setTodoList)
    // - it's updating timestamp (setLastModifiedAt)
    const isTodoListUpdated =
      /^todoList/.test(action.type) &&
      !/^todoList\/(setTodoList|setLastModifiedAt)/.test(action.type);

    // update timestamp of todoList
    if (isTodoListUpdated) {
      const timestamp = new Date().toISOString();
      store.dispatch(setLastModifiedAt(timestamp));
    }

    next(action);
  };
