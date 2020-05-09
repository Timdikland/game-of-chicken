import React, { useState } from "react";
import { Grid, Button, Dropdown } from "semantic-ui-react";

import OfferRow from "../OfferRow";

// offer to
// I offer
// I want

const friendOptions = [
  {
    key: "Jenny Hess",
    text: "Jenny Hess",
    value: "Jenny Hess",
  },
  {
    key: "Elliot Fu",
    text: "Elliot Fu",
    value: "Elliot Fu",
  },
];

function NewOffer() {
  const [bid, setBid] = useState([12, 0, 0, 0]);
  const [ask, setAsk] = useState([5, 0, 0, 0]);
  const [offerTo, setOfferTo] = useState("Everyone");

  const handleBidIncrement = (column, increment) => {
    if (increment) {
      const newBid = bid;
      newBid[column] += 1;
      setBid(newBid);
    } else {
      const newBid = bid;
      newBid[column] -= 1;
      setBid(newBid);
    }
  };

  const handleAskChange = (column, increment) => {
    console.log("did it");
    console.log(bid);
    console.log(ask);
    if (increment) {
      let newAsk = ask;
      newAsk[column] += 1;
      setAsk(newAsk);
    } else {
      let newAsk = ask;
      newAsk[column] -= 1;
      setAsk(newAsk);
    }
  };

  const values = [1, 2, 3, 4];

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <h3>Create new Offer</h3>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Button fluid>{"123"}</Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>Offer for</Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Dropdown
            options={friendOptions}
            selection
            placeholder={"Everyone"}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>Ask</Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <OfferRow offerState={ask} handleChange={handleAskChange} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>Bid</Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column fluid>
          <OfferRow offerState={bid} handleChange={handleBidIncrement} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default NewOffer;
