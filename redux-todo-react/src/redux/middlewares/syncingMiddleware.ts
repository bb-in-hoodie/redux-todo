import { debouncedUpdateTodoList } from "../../apis/todoListApi";
import { checkClientStaleness } from "../../utils/timestamp";
import { setLastModifiedAt } from "../reducers/todoListReducer";
import type { AppMiddleware } from "../store";
import { createSyncingThunk } from "../thunks/syncingThunk";

export const syncWithDb: AppMiddleware =
  (store) => (next) => async (action) => {
    // skip this middleware if
    // - it's not todoList related action
    // - it's initializing process (setTodoList)
    // - it's updating timestamp (setLastModifiedAt)
    const isTodoListUpdated =
      /^todoList/.test(action.type) &&
      !/^todoList\/(setTodoList|setLastModifiedAt)/.test(action.type);

    if (!isTodoListUpdated) {
      next(action);
      return;
    }

    // compare timestamps of client and server to check who has newer data
    try {
      const { todoList } = store.getState();
      const clientModifiedTime = new Date(todoList.lastModifiedAt);
      const isClientStale = await checkClientStaleness(clientModifiedTime);

      // if client has outdated data
      // - abort current updating process (don't run 'next' in this case)
      // - replace client's outdated state with server's newer state
      if (isClientStale) {
        console.log(
          "aborting db updating process because server has newer state, applying server state to client"
        );
        store.dispatch(createSyncingThunk());
        return;
      }

      // if client has newer data
      // - update timestamp
      const timestamp = new Date().toISOString();
      store.dispatch(setLastModifiedAt(timestamp));

      // - process the action first so that the action can be applied to the store
      next(action);

      // - then update db
      const result = await debouncedUpdateTodoList(store.getState().todoList);
      if (result && result.status !== 200) {
        throw new Error(result.data?.error ?? "");
      }
    } catch (e) {
      console.error(e);
    }
  };
