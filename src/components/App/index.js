import React, { useContext } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { withUser } from "../../context/user";
import { withGame } from "../../context/game";
import { FirebaseContext } from "../../context/firebase";

import Home from "../Home";
import Lobby from "../Lobby";
import Game from "../Game";
import FunctionButton from "../FunctionButton";
import SignIn from "../SignIn";

function App() {
  const firebase = useContext(FirebaseContext);
  return (
    <div>
      <Menu fixed={"top"} position={"right"}>
        <Menu.Item name="game-of-chicken" />
      </Menu>
      <Router>
        <Switch>
          <Route path="/functions" component={withUser(FunctionButton)} />
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
