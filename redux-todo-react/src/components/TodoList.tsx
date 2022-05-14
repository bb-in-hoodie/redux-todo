import React from "react";
import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";
import "./TodoList.scss";
import TodoPlaceholder from "./TodoPlaceholder";

export type TodoListProps = {
  title: string;
  todos: Todo[];
  isDone: boolean;
};

function TodoList({ title, todos, isDone }: TodoListProps): JSX.Element {
  return (
    <div className="todo-list">
      <h3 className="title">{title}</h3>
      {todos.length > 0 && (
        <ul>
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.uuid}
              todo={todo}
              isDone={isDone}
              index={index}
              totalLength={todos.length}
            />
          ))}
        </ul>
      )}
      {todos.length === 0 && <TodoPlaceholder />}
    </div>
  );
}

export default TodoList;
