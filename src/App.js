import React from "react";
import "./styles/App.css";
import HomePage from "./container/Pages/HomePage";
import RouteConfig from "./RouteConfig";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RouteConfig />
      </header>
    </div>
  );
}

export default App;
