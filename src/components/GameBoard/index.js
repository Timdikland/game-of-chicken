import React from "react";
import { Grid } from "semantic-ui-react";

import Offers from "../Offers";
import CurrentScore from "../CurrentScore";

function GameBoard({ gameState }) {
  const players = gameState.players;
  const items = gameState.items;
  const offers = gameState.offers;

  return (
    <Grid center container>
      <Grid.Row>
        <Grid.Column>
          <CurrentScore />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Offers />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>{JSON.stringify(gameState)}</Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default GameBoard;
