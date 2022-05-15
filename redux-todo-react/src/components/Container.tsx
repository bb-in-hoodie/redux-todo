import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import "./Container.scss";

function Container(): JSX.Element {
  const todos = useAppSelector((state) => state.todoList.todos);
  const dones = useAppSelector((state) => state.todoList.dones);
  const [isSyncing, setIsSyncing] = useState(true);
  const [mainClassName, setMainClassName] = useState("syncing");
  const syncingClass = isSyncing ? "syncing" : "";

  // TODO: remove 'syncing' class after syncing with DB
  useEffect(() => {
    setTimeout(() => setIsSyncing(false), 3200);
  }, [setIsSyncing]);

  useEffect(() => {
    if (!isSyncing) {
      setTimeout(() => setMainClassName(""));
    }
  }, [isSyncing, setMainClassName]);

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
