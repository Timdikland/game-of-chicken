import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Grid, Button, Dropdown } from "semantic-ui-react";

import { FirebaseContext } from "../../context/firebase";
import { UserContext } from "../../context/user";
import { GameContext } from "../../context/game";

import { createOfferToList } from "./createOfferToList";
import OfferRow from "../OfferRow";
import OfferSummary from "../OfferSummary";

function CreateOffer() {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const game = useContext(GameContext);
  const params = useParams();

  const offerFrom = user.uid;
  const players = game.players;
  const offerToList = createOfferToList(players);

  const [offerTo, setOfferTo] = useState(offerToList[0]);
  const [bid, setBid] = useState(null);
  const [ask, setAsk] = useState(null);
  const [step, setStep] = useState(0);

  const handleNextStep = (currentStep) => {
    console.log(offerTo);
    setStep(currentStep + 1);
  };

  const handlePreviousStep = (currentStep) => {
    setStep(currentStep - 1);
  };

  const createOffer = () => {
    const gameId = params.gameId;
    firebase.doCreateOffer(gameId, ask, bid, offerFrom, offerTo);
  };

  const changeOfferTo = (setState) => (event, data) => {
    event.preventDefault();
    setState(data);
  };

  const changeOfferState = (setState, currentValue) => {
    return null;
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          {step === 0 ? (
            <OfferToForm
              offerTo={offerTo}
              offerToList={offerToList}
              handleChange={changeOfferTo(setOfferTo)}
            />
          ) : null}
          {step === 1 ? (
            <BidForm bid={bid} handleChange={changeOfferState(setBid, bid)} />
          ) : null}
          {step === 2 ? (
            <AskForm ask={ask} handleChange={changeOfferState(setAsk, ask)} />
          ) : null}
          {step === 3 ? (
            <FinalCheck
              offerTo={offerTo}
              bid={bid}
              ask={ask}
              offerFrom={user.displayName}
            />
          ) : null}
        </Grid.Column>
      </Grid.Row>
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
  );
}

function OfferToForm({ offerTo, offerToList, handleChange }) {
  const offerToName = offerTo.key;
  console.log(offerToList);

  return (
    <Dropdown
      placeholder={offerToName}
      fluid
      options={offerToList}
      selection
      onChange={(event, data) => handleChange(event, data)}
    />
  );
}

function BidForm({ bid, handleChange }) {
  return <OfferRow offerState={bid} handleChange={handleChange} />;
}

function AskForm({ ask, handleChange }) {
  return <OfferRow offerState={ask} handleChange={handleChange} />;
}

function FinalCheck({ ask, bid, offerFrom, offerTo }) {
  return (
    <OfferSummary ask={ask} bid={bid} asker={offerFrom} bidder={offerTo} />
  );
}

export default CreateOffer;
