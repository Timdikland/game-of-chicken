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

// function Offers({ players, items, offers }) {
//   const [createOfferModalOpen, setCreateOfferModalOpen] = useState(false);
//   const [acceptOfferModalOpen, setAcceptOfferModalOpen] = useState(false);

//   return (
//     <Grid>
//       <Grid.Row>
//         <Grid.Column>
//           <Modal
//             trigger={
//               <Button fluid onClick={() => setCreateOfferModalOpen(true)}>
//                 {"Create offers"}
//               </Button>
//             }
//             closeIcon
//             open={createOfferModalOpen}
//             onClose={() => setCreateOfferModalOpen(false)}
//           >
//             <Grid center container>
//               <Grid.Row>
//                 <Grid.Column>
//                   <NewOffer players={players} items={items} offers={offers} />
//                 </Grid.Column>
//               </Grid.Row>
//             </Grid>
//           </Modal>
//         </Grid.Column>
//       </Grid.Row>
//       <Grid.Row>
//         <Grid.Column>
//           <Modal
//             trigger={
//               <Button fluid onClick={() => setAcceptOfferModalOpen(true)}>
//                 {"Accept offers"}
//               </Button>
//             }
//             closeIcon
//             open={acceptOfferModalOpen}
//             onClose={() => setAcceptOfferModalOpen(false)}
//           >
//             Modal Accept
//             <Grid container center>
//               <Grid.Row>
//                 <Grid.Column>
//                   <ManageOffers />
//                 </Grid.Column>
//               </Grid.Row>
//             </Grid>
//           </Modal>
//         </Grid.Column>
//       </Grid.Row>
//     </Grid>
//   );
// }
