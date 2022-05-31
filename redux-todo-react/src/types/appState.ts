import { immerable } from "immer";

export default class AppState {
  [immerable] = true; // needed to use a class in Redux

  pollingTimeoutId?: NodeJS.Timeout; // timeout id of upcoming polling event

  constructor(pollingTimeoutId?: NodeJS.Timeout) {
    this.pollingTimeoutId = pollingTimeoutId;
  }
}
