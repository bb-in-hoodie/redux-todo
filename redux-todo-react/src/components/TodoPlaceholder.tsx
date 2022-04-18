import React from "react";
import "./TodoPlaceholder.scss";

function TodoPlaceholder(): JSX.Element {
  return (
    <div className="todo-placeholder">
      <span className="message">list is empty</span>
    </div>
  );
}

export default TodoPlaceholder;
