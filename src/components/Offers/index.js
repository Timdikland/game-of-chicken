import React, { useState } from "react";
import { Grid, Segment, Transition, Menu } from "semantic-ui-react";

import NewOffer from "../NewOffer";
import ManageOffers from "../ManageOffers";
import CreateOffer from "../CreateOffer";
import Trade from "../Trade";

function Offers() {
  const [activeItem, setActiveItem] = useState("accept");

  const handleMenuClick = (e, d) => {
    e.preventDefault();
    setActiveItem(d.name);
  };

  const createOfferEffect = () => {
    setActiveItem("manage");
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Menu tabular attached={"top"} fluid widths={3}>
            <Menu.Item
              name={"create"}
              active={activeItem === "create"}
              onClick={(e, d) => handleMenuClick(e, d)}
            />
            <Menu.Item
              name={"manage"}
              active={activeItem === "manage"}
              onClick={(e, d) => handleMenuClick(e, d)}
            />
            <Menu.Item
              name={"accept"}
              active={activeItem === "accept"}
              onClick={(e, d) => handleMenuClick(e, d)}
            />
          </Menu>
          <Transition.Group duration={200} animation="slide down">
            {activeItem === "create" ? (
              <Segment>
                <CreateOffer createOfferEffect={createOfferEffect} />
              </Segment>
            ) : null}
            {activeItem === "manage" ? (
              <Segment>
                <ManageOffers />
              </Segment>
            ) : null}
            {activeItem === "accept" ? (
              <Segment>
                <Trade handleActivateManageOffers={() => console.log("new")} />
              </Segment>
            ) : null}
          </Transition.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Offers;
