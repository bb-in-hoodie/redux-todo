import React from "react";
import { Todo } from "../types/todo";
import "./TodoItem.scss";

export type TodoItemProps = {
  todo: Todo;
};

function TodoItem({ todo }: TodoItemProps): JSX.Element {
  return (
    <li className="todo-item">
      <div className="main-wrapper">
        <input type="checkbox" className="item-done" name="done" id="done" />
        <div className="item-content" contentEditable>
          {todo.content}
        </div>
        <div className="button-group">
          <button type="button">
            <span className="button-icon">˄</span>
          </button>
          <button type="button">
            <span className="button-icon">˅</span>
          </button>
        </div>
      </div>
      <button type="button" className="remove-item">
        <span className="button-icon taller">x</span>
      </button>
    </li>
  );
}

export default TodoItem;
