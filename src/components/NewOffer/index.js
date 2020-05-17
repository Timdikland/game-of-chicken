import React, { useState, useContext } from "react";
import { Grid, Button, Dropdown } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { FirebaseContext } from "../../context/firebase";
import { UserContext } from "../../context/user";
import { GameContext } from "../../context/game";

import { ITEMS } from "../../constants/gameItems";

import OfferRow from "../OfferRow";

import { createOfferToList } from "./createOfferToList";

function NewOffer() {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const game = useContext(GameContext);
  const params = useParams();

  const offerFrom = user.uid;
  const players = game.players;
  const offers = game.offers;
  const items = game.items;
  const offerToList = createOfferToList(players);

  const zeroState = {};
  ITEMS.forEach((key) => (zeroState[key] = 0));

  const [bid, setBid] = useState(zeroState);
  const [ask, setAsk] = useState(zeroState);
  const [offerTo, setOfferTo] = useState(offerToList[0].value);

  const handleChange = (state, setState) => (key, increment) => {
    if (increment) {
      setState({ ...state, [key]: state[key] + 1 });
    } else {
      setState({ ...state, [key]: state[key] - 1 });
    }
  };

  const handleOfferToChange = (setState) => (data) => {
    setState(data.value);
  };

  console.log(offerToList);
  console.log(offerTo);

  const createOffer = (gameId, ask, bid, offerFrom, offerTo) => {
    console.log(offerTo);
    firebase.doCreateOffer(gameId, ask, bid, offerFrom, offerTo);
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
            placeholder={"Everyone"}
            fluid
            options={offerToList}
            selection
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
            onClick={() =>
              createOffer(params.gameId, ask, bid, offerFrom, offerTo)
            }
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
