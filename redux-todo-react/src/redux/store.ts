import {
  AnyAction,
  combineReducers,
  configureStore,
  Middleware,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { syncWithDb } from "./middlewares/syncingMiddleware";
import appStateReducer from "./reducers/appStateReducer";
import todoListReducer from "./reducers/todoListReducer";

const reducer = combineReducers({
  appState: appStateReducer,
  todoList: todoListReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(syncWithDb),
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type AppMiddleware = Middleware<{}, RootState, AppDispatch>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;
