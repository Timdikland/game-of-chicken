import React from "react";
import { Grid, Divider } from "semantic-ui-react";

import Offers from "../Offers";
import CurrentScore from "../CurrentScore";

function GameBoard() {
  return (
    <Grid center container padded>
      <Grid.Row>
        <Grid.Column>
          <CurrentScore />
        </Grid.Column>
      </Grid.Row>
      <Divider />
      <Grid.Row>
        <Grid.Column>
          <Offers />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default GameBoard;
