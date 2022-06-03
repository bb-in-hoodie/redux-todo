import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { getLastModifiedAt } from "../../apis/todoListApi";
import { updatePollingTimeoutId } from "../reducers/appStateReducer";
import { RootState } from "../store";
import { createSyncingThunk } from "./syncingThunk";

export const POLLING_DELAY = 10 * 1000; // in milliseconds

/**
 * 'createPollingThunk' and 'createTimestampComparingThunk' will keep dispatching each other
 * so that polling can be conducted every time POLLING_DELAY elapsed.
 * Unless there is an interruption (ex. outer call of 'createPollingThunk')
 */

// keep polling to check if client state is synced with server state
export function createPollingThunk(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return (dispatch) => {
    // schedule next polling
    const timeoutId = setTimeout(
      () => dispatch(createTimestampComparingThunk()),
      POLLING_DELAY
    );

    // if there was already a scheduled polling, that would be cancelled and replaced with the new one
    dispatch(updatePollingTimeoutId(timeoutId));
  };
}

// compare timestamp of client and server and update state if client state is stale
export function createTimestampComparingThunk(
  shouldSchedule = true
): ThunkAction<void, RootState, unknown, AnyAction> {
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
      console.error("an error occured during comparing tiemstamp with server");
      console.error(e);
    } finally {
      if (shouldSchedule) {
        // request scheduling the next polling
        dispatch(createPollingThunk());
      }
    }
  };
}
