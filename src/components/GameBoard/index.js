import React, { useState } from "react";
import { Grid, Button, Segment, Transition, List } from "semantic-ui-react";

import { GameContext } from "../../context/game";

import Score from "../Score";
import Offers from "../Offers";
import Inventory from "../Inventory";
import CurrentScore from "../CurrentScore";
import NewOffer from "../NewOffer";
import ManageOffers from "../ManageOffers";

function OfferGroup({ manageOffersIsActive, newOfferIsActive }) {
  return (
    <Transition.Group
      as={"List"}
      duration={500}
      divided
      size="huge"
      verticalAlign="middle"
    >
      {newOfferIsActive ? (
        <List.Item attached>
          <NewOffer />
        </List.Item>
      ) : null}
      {manageOffersIsActive ? (
        <List.Item attached>
          <ManageOffers />
        </List.Item>
      ) : null}
    </Transition.Group>
  );
}

function GameBoard({ gameState }) {
  const players = gameState.players;
  const items = gameState.items;
  const offers = gameState.offers;

  const [manageOffersIsActive, setManageOffersIsActive] = useState(false);
  const [newOfferIsActive, setNewOfferIsActive] = useState(false);

  const handleActivateNewOffer = (e) => {
    e.preventDefault();
    setNewOfferIsActive(!newOfferIsActive);
    setManageOffersIsActive(false);
  };

  const handleActivateManageOffers = (e) => {
    e.preventDefault();
    setManageOffersIsActive(!manageOffersIsActive);
    setNewOfferIsActive(false);
  };

  // const gameState = useContext(GameContext);
  return (
    <Grid center container>
      <Grid.Row>
        <Grid.Column>
          <CurrentScore
            itemValues={[0, 1, 2, 3]}
            itemInventory={[3, 6, 7, 1]}
            items={["red", "yellow", "green", "blue"]}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Offers />
        </Grid.Column>
      </Grid.Row>
      {/* <Grid.Row columns={2}>
        <Grid.Column>
          <Button
            fluid
            onClick={(event, data) => handleActivateNewOffer(event)}
          >
            new offer
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button
            fluid
            onClick={(event, data) => handleActivateManageOffers(event)}
          >
            accept offer
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <OfferGroup
            manageOffersIsActive={manageOffersIsActive}
            newOfferIsActive={newOfferIsActive}
          />
        </Grid.Column>
      </Grid.Row> */}
      <Grid.Row>
        <Grid.Column>{JSON.stringify(gameState)}</Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default GameBoard;
