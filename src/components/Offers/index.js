import React, { useState } from "react";
import { Button, Grid, List, Transition } from "semantic-ui-react";

import NewOffer from "../NewOffer";
import ManageOffers from "../ManageOffers";

function Offers() {
  const [manageOffersIsActive, setManageOffersIsActive] = useState(false);
  const [newOfferIsActive, setNewOfferIsActive] = useState(false);

  const handleActivateNewOffer = (state) => () => {
    setNewOfferIsActive(!state);
    setManageOffersIsActive(false);
  };

  const handleActivateManageOffers = (state) => () => {
    setManageOffersIsActive(!state);
    setNewOfferIsActive(false);
  };

  return (
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Button
            fluid
            onClick={() => handleActivateNewOffer(newOfferIsActive)()}
          >
            new offer
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button
            fluid
            onClick={() => handleActivateManageOffers(manageOffersIsActive)()}
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
            handleActivateManageOffers={handleActivateManageOffers(
              manageOffersIsActive
            )}
            handleActivateNewOffer={handleActivateNewOffer(newOfferIsActive)}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function OfferGroup({
  manageOffersIsActive,
  newOfferIsActive,
  handleActivateManageOffers,
  handleActivateNewOffer,
}) {
  return (
    <Transition.Group
      as={"List"}
      duration={500}
      divided
      size="huge"
      verticalAlign="middle"
      animation="slide down"
    >
      {newOfferIsActive ? (
        <List.Item attached>
          <NewOffer handleActivateNewOffer={handleActivateNewOffer} />
        </List.Item>
      ) : null}
      {manageOffersIsActive ? (
        <List.Item attached>
          <ManageOffers
            handleActivateManageOffers={handleActivateManageOffers}
          />
        </List.Item>
      ) : null}
    </Transition.Group>
  );
}

export default Offers;
