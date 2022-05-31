import React, { useEffect, useState } from "react";
import { getTodoList } from "../apis/todoListApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setTodoList } from "../redux/reducers/todoListReducer";
import { sleep } from "../utils/async";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import "./Container.scss";

function Container(): JSX.Element {
  // redux
  const dispatch = useAppDispatch();
  const uuid = useAppSelector((state) => state.todoList.uuid);
  const todos = useAppSelector((state) => state.todoList.todos);
  const dones = useAppSelector((state) => state.todoList.dones);

  // DB
  const [isSyncing, setIsSyncing] = useState(true);
  const [mainClassName, setMainClassName] = useState("syncing");
  const syncingClass = isSyncing ? "syncing" : "";

  // on initial mount, hide main and input until API response is arrived
  useEffect(() => {
    if (!isSyncing) {
      setTimeout(() => setMainClassName(""));
    }
  }, [isSyncing, setMainClassName]);

  // fetch todo list data from the server if there is none
  useEffect(() => {
    if (uuid) {
      setIsSyncing(false);
      return;
    }

    (async () => {
      try {
        await sleep(2800); // sleep for a second to show DB sync message on purpose :P
        const { data } = await getTodoList();
        dispatch(setTodoList(data));
        setIsSyncing(false);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [uuid, setIsSyncing]);

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
