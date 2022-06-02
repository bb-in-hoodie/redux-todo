import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { getTodoList } from "../../apis/todoListApi";
import { setIsSyncingWithDb } from "../reducers/appStateReducer";
import { setTodoList } from "../reducers/todoListReducer";
import { RootState } from "../store";

export function createSyncingThunk(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async (dispatch) => {
    try {
      dispatch(setIsSyncingWithDb(true)); // mark as syncing

      // fetch todoList from server and update client-side state
      const { data } = await getTodoList();
      dispatch(setTodoList(data));
      dispatch(setIsSyncingWithDb(false)); // mark as done
    } catch (e) {
      console.error(e);
    }
  };
}
