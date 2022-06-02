import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { getLastModifiedAt } from "../../apis/todoListApi";
import { updatePollingTimeoutId } from "../reducers/appStateReducer";
import { RootState } from "../store";
import { createSyncingThunk } from "./syncingThunk";

export const POLLING_DELAY = 10 * 1000; // in milliseconds

/**
 * 'createPollingThunk' and 'createSchedulePollingThunk' will keep dispatching each other
 * so that polling can be conducted every time POLLING_DELAY elapsed
 * unless there is an interruption (outer call of 'createSchedulePollingThunk')
 */

function createPollingThunk(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async (dispatch, getState) => {
    try {
      // fetch server-side lastModifiedAt value
      const { data } = await getLastModifiedAt();
      const { lastModifiedAt } = data;
      const serverModifiedTime = new Date(lastModifiedAt);

      // compare it with client-side lastModifiedAt value
      const { todoList } = getState();
      const clientModifiedTime = new Date(todoList.lastModifiedAt);

      // if client has outdated data, replace it with server-side one
      if (clientModifiedTime < serverModifiedTime) {
        console.log("updating todoList since client has a stale one");
        dispatch(createSyncingThunk());
      }
    } catch (e) {
      console.error(e);
    } finally {
      // request scheduling the next polling
      dispatch(createSchedulePollingThunk());
    }
  };
}

export function createSchedulePollingThunk(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return (dispatch) => {
    // schedule next polling
    const timeoutId = setTimeout(
      () => dispatch(createPollingThunk()),
      POLLING_DELAY
    );
    dispatch(updatePollingTimeoutId(timeoutId));
  };
}
