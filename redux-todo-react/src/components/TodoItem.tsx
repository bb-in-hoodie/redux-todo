import React from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  moveTodo,
  removeDone,
  removeTodo,
  setAsDone,
  setAsTodo,
} from "../redux/reducers/todoListReducer";
import { Todo } from "../types/todo";
import "./TodoItem.scss";

export type TodoItemProps = {
  todo: Todo;
  isDone: boolean;
  index: number;
  totalLength: number;
};

function TodoItem({
  todo,
  isDone,
  index,
  totalLength,
}: TodoItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDone) {
      dispatch(setAsTodo(todo));
    } else {
      dispatch(setAsDone(todo));
    }
  };

  const handleDeleteClick = () => {
    if (isDone) {
      dispatch(removeDone(todo));
    } else {
      dispatch(removeTodo(todo));
    }
  };

  // move event
  const isOnTop = index === 0;
  const isOnBottom = index === totalLength - 1;

  const handleMoveClick = (amount: number) => {
    if (isDone || (amount < 0 && isOnTop) || (amount > 0 && isOnBottom)) {
      return;
    }

    dispatch(moveTodo({ todo, amount }));
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
        {!isDone && (
          <div className="button-group">
            <button
              type="button"
              className="move-item"
              disabled={isOnTop}
              onClick={() => handleMoveClick(-1)}
            >
              <span className="button-icon">˄</span>
            </button>
            <button
              type="button"
              className="move-item"
              disabled={isOnBottom}
              onClick={() => handleMoveClick(1)}
            >
              <span className="button-icon">˅</span>
            </button>
          </div>
        )}
      </div>
      <button type="button" className="remove-item" onClick={handleDeleteClick}>
        <span className="button-icon taller">x</span>
      </button>
    </li>
  );
}

export default TodoItem;
