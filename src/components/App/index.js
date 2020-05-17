import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { withUser } from "../../context/user";
import { withGame } from "../../context/game";

import Home from "../Home";
import Lobby from "../Lobby";
import Game from "../Game";
import SignIn from "../SignIn";

function App() {
  return (
    <div>
      <Menu fixed={"top"} position={"right"}>
        <Menu.Item name="game-of-chicken" />
      </Menu>
      <Router>
        <Switch>
          <Route path="/lobby" component={withUser(Lobby)} />
          <Route path="/games/:gameId" component={withGame(withUser(Game))} />
          <Route path="/" component={withUser(Home)} />
          <Route path="/signin" component={SignIn} />
        </Switch>
      </Router>
    </div>
  );
}

export default withUser(App);
