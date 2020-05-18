import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
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

  const createGame = (userId) => {
    firebase
      .doCreateNewGame(userId)
      .then((gameId) => history.push(`/games/${gameId}`));
  };

  const joinGame = (gid) => {
    // firebase
    //   .gamePlayers(gid)
    //   .push({ uid: user.uid, displayName: user.displayName, isReady: false });
    firebase.gamePlayer(gid, user.uid).set({
      displayName: user.displayName,
      isReady: false,
    });
    history.push(`/games/${gid}`);
  };

  return (
    <Grid container>
      <Grid.Row>
        <Grid.Column textAlign={"center"}>
          <Header> {""} </Header>{" "}
        </Grid.Column>{" "}
      </Grid.Row>{" "}
      <Grid.Row>
        <Grid.Column textAlign={"center"}>
          <Header> {`Hi there! Enter a code to join an existing game`} </Header>{" "}
        </Grid.Column>{" "}
      </Grid.Row>{" "}
      <Grid.Row>
        <Grid.Column>
          <Input
            fluid
            onChange={(event, data) => handleChange(event)}
            placeholder={"Type GameId"}
            value={gameId}
          />{" "}
        </Grid.Column>{" "}
      </Grid.Row>{" "}
      <Grid.Row>
        <Grid.Column>
          <Button fluid onClick={() => joinGame(gameId)}>
            {" "}
            {"Join game"}{" "}
          </Button>{" "}
        </Grid.Column>{" "}
      </Grid.Row>{" "}
      <Grid.Row>
        <Grid.Column textAlign={"center"}>
          <Header> {"Or create a new game"} </Header>{" "}
        </Grid.Column>{" "}
      </Grid.Row>{" "}
      <Grid.Row>
        <Grid.Column>
          <Button fluid onClick={() => createGame(user.uid)}>
            {" "}
            {"Create game"}{" "}
          </Button>{" "}
        </Grid.Column>{" "}
      </Grid.Row>{" "}
    </Grid>
  );
}

export default Lobby;
