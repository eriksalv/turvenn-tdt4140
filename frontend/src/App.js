import React, { useEffect } from "react";
import axios from "axios";

import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    async function backendStatusCheck() {
      const response = await axios.get("http://0.0.0.0:4000");
      return response.data.status;
    }
    backendStatusCheck().then((status) => console.log("response ", status));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
