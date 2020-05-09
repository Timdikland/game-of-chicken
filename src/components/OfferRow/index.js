import React from "react";
import { Grid, Label, Button, Segment, Input, Icon } from "semantic-ui-react";
import ChangeValue from "../ChangeValue";

function OfferRow({ offerState, handleChange }) {
  const colors = ["red", "blue", "yellow", "green"];

  return (
    <Grid>
      <Grid.Row columns={4}>
        {offerState.map((v, k) => (
          <Grid.Column>
            <Segment.Group>
              <Button
                attached={"top"}
                fluid
                icon={"angle up"}
                onClick={() => handleChange(k, true)}
              />
              <Segment>
                <Icon name={"circle"} color={colors[k]} size={"large"} />
                {v}
              </Segment>
              <Button
                attached={"bottom"}
                fluid
                icon={"angle down"}
                onClick={() => handleChange(k, false)}
              />
            </Segment.Group>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
}

export default OfferRow;
