import React from "react";
import { Grid } from "semantic-ui-react";

import Offers from "../Offers";
import CurrentScore from "../CurrentScore";

function GameBoard({ gameState, user }) {
  return (
    <Grid container padded>
      <Grid.Row>
        <Grid.Column>
          <CurrentScore gameState={gameState} user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Offers gameState={gameState} user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <CurrentScore gamestate={gameState} user={user} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default GameBoard;
