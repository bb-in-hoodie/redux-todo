import { immerable } from "immer";

export default class AppState {
  [immerable] = true; // needed to use a class in Redux

  pollingTimeoutId?: NodeJS.Timeout; // timeout id of upcoming polling event
  isSyncingWithDb = true; // the app would start syncing with db on start

  constructor(pollingTimeoutId?: NodeJS.Timeout) {
    this.pollingTimeoutId = pollingTimeoutId;
  }
}
