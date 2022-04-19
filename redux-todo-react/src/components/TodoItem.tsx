import React from "react";
import { useAppDispatch } from "../redux/hooks";
import { setAsDone, setAsTodo } from "../redux/reducers/todoListReducer";
import { Todo } from "../types/todo";
import "./TodoItem.scss";

export type TodoItemProps = {
  todo: Todo;
  isDone: boolean;
};

function TodoItem({ todo, isDone }: TodoItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDone) {
      dispatch(setAsTodo(todo));
    } else {
      dispatch(setAsDone(todo));
    }
  };

  return (
    <li className="todo-item">
      <div className="main-wrapper">
        <input
          type="checkbox"
          className="item-done"
          name="done"
          id="done"
          checked={isDone}
          onClick={handleCheckboxClick}
          readOnly
        />
        <div
          className="item-content"
          contentEditable
          suppressContentEditableWarning
        >
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
