import React, { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { addTodo } from "../redux/reducers/todoListReducer";
import { Todo } from "../types/todo";
import "./AddTodo.scss";

function AddTodo(): JSX.Element {
  // redux state
  const dispatch = useAppDispatch();

  // local state
  const [content, setContent] = useState("");
  const isAddable = content.trim()?.length > 0;

  // functions
  const registerTodo = () => {
    // create and add a todo
    const trimmed = content.trim();
    const todo = Todo.createTodo(trimmed);
    dispatch(addTodo(todo));
    setContent(""); // reset
  };

  // event handlers
  const handleClick = () => {
    if (isAddable) {
      registerTodo();
    }
  };

  const handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isAddable) {
      registerTodo();
    }
  };

  return (
    <div className="add-todo">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeydown}
      />
      <div className="button-wrapper">
        <button
          type="button"
          className="add"
          disabled={!isAddable}
          onClick={handleClick}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default AddTodo;
