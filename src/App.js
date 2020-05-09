import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Lobby from "./components/Lobby";
import Game from "./components/Game";

function App() {
  return (
    <Switch>
      <Route path="/lobby" component={Lobby} />
      <Route path="/game/:gameId" component={Game} />
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default App;
