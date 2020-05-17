import React from "react";

import { Grid } from "semantic-ui-react";

function ScoreTable(props) {
  const symbols = ["Circle", "Square", "Triangle", "Pentagon"];
  return (
    <Grid celled centered>
      <Grid.Row>
        {symbols.map((s, k) => (
          <Grid.Column key={k} width={3}>
            {s}
          </Grid.Column>
        ))}
      </Grid.Row>
      <Grid.Row>
        {props.score.map((s, k) => (
          <Grid.Column width={3} key={k}>
            {s}
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
}

function Score(props) {
  const score = props.score;
  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={12}>Values</Grid.Column>
        <Grid.Column width={4}>Score </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={12}>
          <ScoreTable score={score} />
        </Grid.Column>
        <Grid.Column width={4}>
          <p>10</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Score;
