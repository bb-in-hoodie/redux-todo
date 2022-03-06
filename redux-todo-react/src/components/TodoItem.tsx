import React from "react";
import "./TodoItem.scss";

function TodoItem(): JSX.Element {
  return (
    <li>
      <div className="main-wrapper">
        <input type="checkbox" className="item-done" name="done" id="done" />
        <div className="item-content" contentEditable>
          이것은 TODO Item 입니다.
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
