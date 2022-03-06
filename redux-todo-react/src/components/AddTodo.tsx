import React from "react";
import "./AddTodo.scss";

function AddTodo(): JSX.Element {
  return (
    <div className="add-todo">
      <input type="text" />
      <div className="button-wrapper">
        <button type="button" className="add">
          +
        </button>
      </div>
    </div>
  );
}

export default AddTodo;
