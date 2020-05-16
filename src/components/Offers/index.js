import React, { useState } from "react";
import { Button, Modal, Grid } from "semantic-ui-react";

import NewOffer from "../NewOffer";
import ManageOffers from "../ManageOffers";

function Offers({ players, items, offers }) {
  const [createOfferModalOpen, setCreateOfferModalOpen] = useState(false);
  const [acceptOfferModalOpen, setAcceptOfferModalOpen] = useState(false);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Modal
            trigger={
              <Button fluid onClick={() => setCreateOfferModalOpen(true)}>
                {"Create offers"}
              </Button>
            }
            closeIcon
            open={createOfferModalOpen}
            onClose={() => setCreateOfferModalOpen(false)}
          >
            <Grid center container>
              <Grid.Row>
                <Grid.Column>
                  <NewOffer players={players} items={items} offers={offers} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Modal
            trigger={
              <Button fluid onClick={() => setAcceptOfferModalOpen(true)}>
                {"Accept offers"}
              </Button>
            }
            closeIcon
            open={acceptOfferModalOpen}
            onClose={() => setAcceptOfferModalOpen(false)}
          >
            Modal Accept
            <Grid container center>
              <Grid.Row>
                <Grid.Column>
                  <ManageOffers />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Offers;
