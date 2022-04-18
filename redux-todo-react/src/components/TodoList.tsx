import React from "react";
import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";
import "./TodoList.scss";
import TodoPlaceholder from "./TodoPlaceholder";

export type TodoListProps = {
  title: string;
  todos: Todo[];
};

function TodoList({ title, todos }: TodoListProps): JSX.Element {
  return (
    <div className="todo-list">
      <h3 className="title">{title}</h3>
      {todos.length > 0 && (
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo.uuid} todo={todo} />
          ))}
        </ul>
      )}
      {todos.length === 0 && <TodoPlaceholder />}
    </div>
  );
}

export default TodoList;
