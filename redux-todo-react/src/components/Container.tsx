import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import "./Container.scss";

function Container(): JSX.Element {
  return (
    <div className="container">
      <header>
        <span className="logo">REDUX TODO</span>
      </header>
      <main>
        <TodoList
          title="TODOS"
          todos={[
            {
              uuid: "1",
              content: "test",
              createdAt: new Date(),
              lastModifiedAt: new Date(),
            },
            {
              uuid: "2",
              content: "test",
              createdAt: new Date(),
              lastModifiedAt: new Date(),
            },
          ]}
        />
        <TodoList title="DONES" todos={[]} />
      </main>
      <AddTodo />
    </div>
  );
}

export default Container;
