import React from "react";
import { useAppSelector } from "../redux/hooks";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import "./Container.scss";

function Container(): JSX.Element {
  const todos = useAppSelector((state) => state.todoList.todos);
  const dones = useAppSelector((state) => state.todoList.dones);

  return (
    <div className="container">
      <header>
        <span className="logo">REDUX TODO</span>
      </header>
      <main>
        <TodoList title="TODOS" todos={todos} isDone={false} />
        <TodoList title="DONES" todos={dones} isDone />
      </main>
      <AddTodo />
    </div>
  );
}

export default Container;
