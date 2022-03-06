import React from "react";
import TodoItem from "./TodoItem";
import "./TodoList.scss";

function TodoList(): JSX.Element {
  return (
    <ul>
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </ul>
  );
}

export default TodoList;
