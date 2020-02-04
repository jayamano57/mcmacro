import React from "react";
import "./sass/main.scss";
import Home from "./components/home/Home";
import Results from "./components/results/Results";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/results" component={Results} />
    </Router>
  );
}

export default App;
