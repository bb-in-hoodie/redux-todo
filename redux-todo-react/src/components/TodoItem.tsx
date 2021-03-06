import React from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  moveTodo,
  removeDone,
  removeTodo,
  setAsDone,
  setAsTodo,
  updateDone,
  updateTodo,
} from "../redux/reducers/todoListReducer";
import { Todo } from "../types/todo";
import { getTimestampUpdatedCopy } from "../utils/timestamp";
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
    const updatedTodo = getTimestampUpdatedCopy(todo);
    dispatch(isDone ? setAsTodo(updatedTodo) : setAsDone(updatedTodo));
  };

  const handleDeleteClick = () => {
    const updatedTodo = getTimestampUpdatedCopy(todo);
    dispatch(isDone ? removeDone(updatedTodo) : removeTodo(updatedTodo));
  };

  const updateContent = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    const trimmedContent = e.currentTarget.innerText.trim();
    const isContentUpdated =
      trimmedContent.length > 0 && trimmedContent !== todo.content;

    // update todo if content is changed and not empty
    if (isContentUpdated) {
      const updatedTodo = getTimestampUpdatedCopy({
        ...todo,
        content: trimmedContent,
      });
      dispatch(isDone ? updateDone(updatedTodo) : updateTodo(updatedTodo));
    }

    // update innerText to show trimmed content or restore the original content if trimmed result is empty string
    e.currentTarget.innerText = isContentUpdated
      ? trimmedContent
      : todo.content;
  };

  const handleContentKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  // move event
  const isOnTop = index === 0;
  const isOnBottom = index === totalLength - 1;

  const handleMoveClick = (amount: number) => {
    if (isDone || (amount < 0 && isOnTop) || (amount > 0 && isOnBottom)) {
      return;
    }

    const updatedTodo = getTimestampUpdatedCopy(todo);
    dispatch(moveTodo({ todo: updatedTodo, amount }));
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
          role="none"
          className="item-content"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateContent(e)}
          onKeyDown={(e) => handleContentKeyDown(e)}
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
              <span className="button-icon">??</span>
            </button>
            <button
              type="button"
              className="move-item"
              disabled={isOnBottom}
              onClick={() => handleMoveClick(1)}
            >
              <span className="button-icon">??</span>
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
