import { checkClientStaleness } from "../../utils/timestamp";
import { updatePollingTimeoutId } from "../reducers/appStateReducer";
import type { AppThunk } from "../store";
import { createSyncingThunk } from "./syncingThunk";

export const POLLING_DELAY = 10 * 1000; // in milliseconds

/**
 * 'createPollingThunk' and 'createTimestampComparingThunk' will keep dispatching each other
 * so that polling can be conducted every time POLLING_DELAY elapsed.
 * Unless there is an interruption (ex. outer call of 'createPollingThunk')
 */

// keep polling to check if client state is synced with server state
export function createPollingThunk(): AppThunk {
  return (dispatch) => {
    // schedule next polling
    const timeoutId = setTimeout(
      () => dispatch(createTimestampComparingThunk()),
      POLLING_DELAY
    );

    // if there was an already scheduled polling, that would be cancelled and replaced with the new one
    dispatch(updatePollingTimeoutId(timeoutId));
  };
}

// compare timestamps of client and server to update state if client state is stale
export function createTimestampComparingThunk(): AppThunk {
  return async (dispatch, getState) => {
    try {
      // if client has outdated data, replace it with server-side one
      const { todoList } = getState();
      const clientModifiedTime = new Date(todoList.lastModifiedAt);
      const isClientStale = await checkClientStaleness(clientModifiedTime);

      if (isClientStale) {
        console.log("updating todoList since client has a stale one");
        dispatch(createSyncingThunk());
      }
    } catch (e) {
      console.error(
        "an error occurred during comparing timestamps of client and server"
      );
      console.error(e);
    } finally {
      // request scheduling the next polling
      dispatch(createPollingThunk());
    }
  };
}
