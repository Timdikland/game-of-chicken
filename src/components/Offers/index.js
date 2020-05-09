import React, { useState } from "react";
import { Button, Modal, Grid } from "semantic-ui-react";

import NewOffer from "../NewOffer";

function Offers() {
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
            open={createOfferModalOpen}
            onClose={() => setCreateOfferModalOpen(false)}
          >
            <Grid center container>
              <Grid.Row>
                <Grid.Column>
                  <NewOffer />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button
                    floated={"right"}
                    onClick={() => setCreateOfferModalOpen(false)}
                  >
                    back
                  </Button>
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
            open={acceptOfferModalOpen}
            onClose={() => setAcceptOfferModalOpen(false)}
          >
            Modal Accept
            <Button onClick={() => setAcceptOfferModalOpen(false)}>back</Button>
          </Modal>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Offers;
