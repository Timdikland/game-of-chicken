import React from "react";

import { Grid, Header, Button, Segment, Icon } from "semantic-ui-react";

function allPlayersReady(players) {
  if (!players) {
    return false;
  } else {
    let ready = true;
    console.log(players);
    const playerAttributes = Object.values(players);
    for (let i = 0; i < playerAttributes.length; i++) {
      if (!playerAttributes[i].isReady) {
        ready = false;
      }
    }
    return ready;
  }
}

function GameRoom({ gameState, handlePlayerStatusChange, handleStartGame }) {
  const players = gameState.players;
  const allReady = allPlayersReady(players);

  return (
    <Grid container center>
      <Grid.Row>
        <Grid.Column>
          <Header>Are you ready to play?</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Button onClick={() => handlePlayerStatusChange(players)}>
            Ready
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          {players
            ? Object.values(players).map((key, idx) => {
                return (
                  <Segment vertical>
                    <Header size={"small"}>
                      <Icon
                        name={key.isReady ? "check" : "close"}
                        color={key.isReady ? "green" : "red"}
                      />
                      {key.displayName}
                    </Header>
                  </Segment>
                );
              })
            : null}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Button
            disabled={allReady ? false : true}
            onClick={() => handleStartGame(allReady)}
          >
            Start Game
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default GameRoom;
