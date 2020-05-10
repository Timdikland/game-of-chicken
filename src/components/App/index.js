import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Home from "../Home";
import Lobby from "../Lobby";
import Game from "../Game";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/lobby" component={Lobby} />
        <Route path="/game/:gameId" component={Game} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
