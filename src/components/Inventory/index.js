import React from "react";

import { Grid } from "semantic-ui-react";

function ScoreTable(props) {
  const symbols = ["Circle", "Square", "Triangle", "Pentagon"];
  console.log(props.score);
  return (
    <Grid celled>
      <Grid.Row>
        {symbols.map((s, k) => (
          <Grid.Column key={k} width={4}>
            {s}
          </Grid.Column>
        ))}
      </Grid.Row>
      <Grid.Row>
        {props.score.map((s, k) => (
          <Grid.Column width={4} key={k}>
            {s}
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
}

function Inventory() {
  const score = [12, 3, 4, 5];
  return (
    <div>
      <h2>Current inventory</h2>
      <ScoreTable score={score} />
    </div>
  );
}

export default Inventory;
