import { Middleware } from "@reduxjs/toolkit";
import { debouncedUpdateTodoList } from "../../apis/todoListApi";

export const updateDb: Middleware = (store) => (next) => async (action) => {
  next(action);

  // skip if
  // - it's not todoList related action
  // - it's initializing process (setTodoList)
  // - it's updating timestamp (setLastModifiedAt)
  const isTodoListUpdated =
    /^todoList/.test(action.type) &&
    !/^todoList\/(setTodoList|setLastModifiedAt)/.test(action.type);

  if (!isTodoListUpdated) {
    return;
  }

  // update db after conducting 'action' (to make 'store' updated)
  try {
    const result = await debouncedUpdateTodoList(store.getState().todoList);
    if (result && result.status !== 200) {
      throw new Error(result.data as any);
    }
  } catch (e) {
    console.error(e);
  }
};
