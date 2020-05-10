import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Grid, Input, Button, Header } from "semantic-ui-react";

import { FirebaseContext } from "../../context/firebase";
import { UserContext } from "../../context/user";

function Lobby() {
  const [gameId, setGameId] = useState("");
  const history = useHistory();

  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);

  const handleChange = (e) => {
    e.preventDefault();
    setGameId(e.target.value);
  };

  const createGame = () => {
    console.log(user);
    const gid = firebase.allGames().push().key;
    firebase
      .gamePlayers(gid)
      .push({ uid: user.uid, displayName: user.displayName });
    history.push(`/games/${gid}`);
  };

  const joinGame = (gid) => {
    firebase
      .gamePlayers(gid)
      .push({ uid: user.uid, displayName: user.displayName });
    history.push(`/games/${gid}`);
  };

  return (
    <Grid center container>
      <Grid.Row>
        <Grid.Column textAlign={"center"}>
          <Header>{""}</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign={"center"}>
          <Header>{"Enter a code to join an existing game"}</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Input
            fluid
            onChange={(event, data) => handleChange(event)}
            placeholder={"Type GameId"}
            value={gameId}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Button fluid onClick={() => joinGame(gameId)}>
            {"Join game"}
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign={"center"}>
          <Header>{"Or create a new game"}</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Button fluid onClick={() => createGame()}>
            {"Create game"}
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Lobby;
