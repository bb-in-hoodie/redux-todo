import React from "react";
import { Provider } from "react-redux";
import Container from "./components/Container";
import store from "./redux/store";
import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Container />
      </div>
    </Provider>
  );
}

export default App;
