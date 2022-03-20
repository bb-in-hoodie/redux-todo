import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import "./Container.scss";

function Container(): JSX.Element {
  return (
    <div className="container">
      <header>
        <span className="logo">REDUX TODO</span>
      </header>
      <main>
        <TodoList />
      </main>
      <AddTodo />
    </div>
  );
}

export default Container;
