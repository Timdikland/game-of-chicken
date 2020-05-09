import React from "react";
import { Grid, Label, Button, Segment, Input, Icon } from "semantic-ui-react";
import ChangeValue from "../ChangeValue";

function OfferRow(props) {
  const colors = ["red", "blue", "red", "green"];

  return (
    <Grid>
      <Grid.Row columns={4}>
        {props.offerState.map((v, k) => (
          <Grid.Column>
            <Segment.Group>
              <Button
                attached={"top"}
                fluid
                icon={"angle up"}
                onClick={() => props.handleChange(k, true)}
              />
              <Segment fluid>{v}</Segment>
              <Button
                attached={"bottom"}
                fluid
                icon={"angle down"}
                onClick={() => props.handleChange(k, false)}
              />
            </Segment.Group>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
}

export default OfferRow;
