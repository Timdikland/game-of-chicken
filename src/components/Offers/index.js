import React, { useState } from "react";
import { Button, Grid, List, Transition } from "semantic-ui-react";

import NewOffer from "../NewOffer";
import ManageOffers from "../ManageOffers";

function Offers() {
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

  return (
    <Grid>
      <Grid.Row columns={2}>
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
      </Grid.Row>
    </Grid>
  );
}

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

export default Offers;
