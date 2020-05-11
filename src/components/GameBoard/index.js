import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";

import { GameContext } from "../../context/game";

import Score from "../Score";
import Offers from "../Offers";
import Inventory from "../Inventory";

function GameBoard() {
  const gameState = useContext(GameContext);
  return (
    <Grid center container>
      <Grid.Row>
        <Grid.Column>
          <Score score={[1, 2, 3, 4]} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Offers />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Inventory score={[1, 2, 3, 4]} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>{JSON.stringify(gameState)}</Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default GameBoard;
