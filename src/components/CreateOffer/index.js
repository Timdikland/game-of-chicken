import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Grid, Button, Dropdown, Header } from "semantic-ui-react";

import { FirebaseContext } from "../../context/firebase";
import { UserContext } from "../../context/user";
import { GameContext } from "../../context/game";
import { ITEMS } from "../../constants/gameItems";

import OfferRow from "../OfferRow";
import OfferSummary from "../OfferSummary";

import { createOfferToList } from "./createOfferToList";
import validateOffer, { validateOnlyNegative } from "./validateOffer";

function CreateOffer({ createOfferEffect }) {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const game = useContext(GameContext);
  const params = useParams();

  const offerFrom = user.uid;
  const players = game.players;
  const offerToList = createOfferToList(players, user.uid);
  const emptyOffer = {};

  ITEMS.forEach((key) => (emptyOffer[key] = 0));

  const [offerTo, setOfferTo] = useState(offerToList[0].value);
  const [bid, setBid] = useState(emptyOffer);
  const [ask, setAsk] = useState(emptyOffer);
  const [step, setStep] = useState(0);

  const handleNextStep = (currentStep) => {
    setStep(currentStep + 1);
  };

  const handlePreviousStep = (currentStep) => {
    setStep(currentStep - 1);
  };

  const createOffer = () => {
    const gameId = params.gameId;
    firebase.doCreateOffer(gameId, ask, bid, offerFrom, offerTo);
    createOfferEffect();
  };

  const changeOfferTo = (setState) => (event, data) => {
    event.preventDefault();
    setState(data.value);
  };

  const changeBidOfferState = (setState, currentState) => (key, mode) => {
    if (mode === "increment") {
      const proposedState = { ...currentState, [key]: currentState[key] + 1 };
      const isValid = validateOffer(
        game.offers,
        game.items,
        user.uid,
        proposedState
      );
      if (isValid) {
        setState(proposedState);
      }
    } else if (mode === "decrement") {
      const proposedState = { ...currentState, [key]: currentState[key] - 1 };
      const isValid = validateOffer(
        game.offers,
        game.items,
        user.uid,
        proposedState
      );
      if (isValid) {
        setState(proposedState);
      }
    }
  };

  const changeAskOfferState = (setState, currentState) => (key, mode) => {
    if (mode === "increment") {
      const proposedState = { ...currentState, [key]: currentState[key] + 1 };
      const isValid = validateOnlyNegative(proposedState);
      if (isValid) {
        setState(proposedState);
      }
    } else if (mode === "decrement") {
      const proposedState = { ...currentState, [key]: currentState[key] - 1 };
      const isValid = validateOnlyNegative(proposedState);
      if (isValid) {
        setState(proposedState);
      }
    }
  };

  return (
    <div>
      {step === 0 ? (
        <OfferToForm
          offerTo={offerTo}
          offerToList={offerToList}
          handleChange={changeOfferTo(setOfferTo)}
        />
      ) : null}
      {step === 1 ? (
        <BidForm bid={bid} handleChange={changeBidOfferState(setBid, bid)} />
      ) : null}
      {step === 2 ? (
        <AskForm ask={ask} handleChange={changeAskOfferState(setAsk, ask)} />
      ) : null}
      {step === 3 ? (
        <FinalCheck
          offerTo={players[offerTo].displayName}
          bid={bid}
          ask={ask}
          offerFrom={user.displayName}
        />
      ) : null}
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            {[1, 2, 3].includes(step) ? (
              <Button fluid onClick={() => handlePreviousStep(step)}>
                Previous step
              </Button>
            ) : null}
          </Grid.Column>
          <Grid.Column>
            {[0, 1, 2].includes(step) ? (
              <Button fluid onClick={() => handleNextStep(step)}>
                Next step
              </Button>
            ) : (
              <Button fluid onClick={() => createOffer()}>
                Creates offer
              </Button>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

function OfferToForm({ offerTo, offerToList, handleChange }) {
  const offerToName = offerToList[0].key;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header>Who is this offer for?</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Dropdown
            placeholder={offerToName}
            fluid
            options={offerToList}
            selection
            onChange={(event, data) => handleChange(event, data)}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function BidForm({ bid, handleChange }) {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header>What do you offer?</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <OfferRow offerState={bid} handleChange={handleChange} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function AskForm({ ask, handleChange }) {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header>What do you offer?</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <OfferRow offerState={ask} handleChange={handleChange} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function FinalCheck({ ask, bid, offerFrom, offerTo }) {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header>Check your offer</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <OfferSummary
            ask={ask}
            bid={bid}
            asker={offerFrom}
            bidder={offerTo}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default CreateOffer;
