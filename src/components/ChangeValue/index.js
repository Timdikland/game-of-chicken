import React from "react";

import { Button, Grid } from "semantic-ui-react";

function ChangeValue(props) {
  const values = props.values;
  return (
    <Grid>
      <Grid.Row>
        {values.map((k, v) => (
          <Grid.Column width={1}>
            <Button>^</Button>
            <p>{v}</p>
            <Button>‿</Button>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
}

export default ChangeValue;
