import React from "react";
import { Grid, Button, Segment, Icon } from "semantic-ui-react";

function OfferRow({ offerState, handleChange }) {
  return (
    <Grid>
      <Grid.Row columns={4}>
        {Object.keys(offerState).map((key, idx) => (
          <Grid.Column>
            <Segment.Group>
              <Button
                attached={"top"}
                fluid
                icon={"angle up"}
                onClick={() => handleChange(key, "increment")}
              />
              <Segment>
                <Icon name={"circle"} color={key} size={"large"} />
                {offerState[key]}
              </Segment>
              <Button
                attached={"bottom"}
                fluid
                icon={"angle down"}
                onClick={() => handleChange(key, "decrement")}
              />
            </Segment.Group>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
}

export default OfferRow;
