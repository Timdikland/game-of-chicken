import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import { withUser } from "../../context/user";
import { withGame } from "../../context/game";

import Home from "../Home";
import Lobby from "../Lobby";
import Game from "../Game";
import FunctionButton from "../FunctionButton";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/functions" component={FunctionButton} />
        <Route path="/lobby" component={Lobby} />
        <Route path="/games/:gameId" component={withGame(Game)} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default withUser(App);
