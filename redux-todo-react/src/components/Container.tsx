import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setIsSyncingWithDb } from "../redux/reducers/appStateReducer";
import { createPollingThunk } from "../redux/thunks/pollingThunk";
import { createSyncingThunk } from "../redux/thunks/syncingThunk";
import { sleep } from "../utils/async";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import "./Container.scss";

function Container(): JSX.Element {
  const dispatch = useAppDispatch();

  // todoList
  const uuid = useAppSelector((state) => state.todoList.uuid);
  const todos = useAppSelector((state) => state.todoList.todos);
  const dones = useAppSelector((state) => state.todoList.dones);

  // DB
  const isSyncingWithDb = useAppSelector(
    (state) => state.appState.isSyncingWithDb
  );
  const [mainClassName, setMainClassName] = useState("syncing");
  const syncingClass = isSyncingWithDb ? "syncing" : "";

  // on initial mount, hide main and input until API response is arrived
  useEffect(() => {
    if (!isSyncingWithDb) {
      setTimeout(() => setMainClassName(""));
    }
  }, [isSyncingWithDb, setMainClassName]);

  // fetch todo list data from the server if there is none
  useEffect(() => {
    if (uuid) {
      dispatch(setIsSyncingWithDb(false));
      return;
    }

    (async () => {
      // because network is too fast these days,
      // you need to set an arbitrary sleep to observe syncing-with-db message
      await sleep(2000);

      // fetching todoList from server and apply it to client
      dispatch(createSyncingThunk());
    })();
  }, [uuid]);

  // schedule polling on start
  useEffect(() => {
    dispatch(createPollingThunk());
  }, []);

  return (
    <div className="cover">
      <div className={`container ${syncingClass}`}>
        <header>
          <span className="logo">REDUX TODO</span>
        </header>
        <main className={mainClassName}>
          <TodoList title="TODOS" todos={todos} isDone={false} />
          <TodoList title="DONES" todos={dones} isDone />
        </main>
        <AddTodo />
      </div>
      <span className={`status ${syncingClass}`}>Syncing with DB</span>
    </div>
  );
}

export default Container;
