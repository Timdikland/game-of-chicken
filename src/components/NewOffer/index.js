import React, { useState, useContext } from "react";
import { Grid, Button, Dropdown } from "semantic-ui-react";

import { FirebaseContext } from "../../context/firebase";

import OfferRow from "../OfferRow";

function NewOffer() {
  const [bid, setBid] = useState([0, 0, 0, 0]);
  const [ask, setAsk] = useState([0, 0, 0, 0]);
  const [offerTo, setOfferTo] = useState("Everyone");

  const firebase = useContext(FirebaseContext);
  const offerListRef = firebase.db.ref("/games/1/offers");

  const OfferToList = [
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
    {
      key: "Everyone",
      text: "Everyone",
      value: "Everyone",
    },
  ];

  const handleChange = (state, setState) => (key, increment) => {
    let newState = [...state];
    if (increment) {
      newState[key] = newState[key] + 1;
    } else {
      newState[key] = newState[key] - 1;
    }
    setState(newState);
  };

  const handleOfferToChange = (setState) => (data) => {
    setState(data["value"]);
  };

  const createOffer = (bid, ask, offerTo) => {
    let canAccept = [];
    if (offerTo === "Everyone") {
      canAccept = [1, 2, 3, 4];
    } else {
      canAccept.push(offerTo);
    }
    offerListRef.push({
      createdBy: "userId",
      bid: bid,
      ask: ask,
      canAccept: canAccept,
    });
  };

  return (
    <Grid container center padded>
      <Grid.Row>
        <Grid.Column textAlign={"center"}>
          <h3>{"This offer can be accepted by"}</h3>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Dropdown
            fluid
            options={OfferToList}
            selection
            value={offerTo}
            onChange={(event, data) => handleOfferToChange(setOfferTo)(data)}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign={"center"}>
          <h3>{"I want to give"}</h3>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column fluid>
          <OfferRow offerState={bid} handleChange={handleChange(bid, setBid)} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign={"center"}>
          <h3>{"I want to recieve"}</h3>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <OfferRow offerState={ask} handleChange={handleChange(ask, setAsk)} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Button
            fluid
            onClick={() => createOffer(bid, ask, offerTo)}
            color={"green"}
          >
            Create a new offer
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default NewOffer;
