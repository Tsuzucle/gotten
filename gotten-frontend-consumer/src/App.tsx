import React, { useEffect } from "react";
import logo from "./logo.svg";
import { useSearchParams } from "react-router-dom";
import { initContract } from "./contract";
import "./App.css";

function App() {
  useEffect(() => {
    initContract();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
