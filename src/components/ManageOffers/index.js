import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Divider, Button } from "semantic-ui-react";

import { FirebaseContext } from "../../context/firebase";
import { UserContext } from "../../context/user";
import { GameContext } from "../../context/game";

import OfferSummary from "../OfferSummary";

import filterOffers from "./filterOffers";

function AcceptOffer() {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const game = useContext(GameContext);

  const gameId = useParams().gameId;
  const filteredOffers = filterOffers(game, user.uid);

  const handleRetractOffer = (offerId) => {
    firebase.doRemoveOffer(gameId, offerId);
  };

  return (
    <div>
      {!!filteredOffers ? (
        <FilteredOfferList
          offers={filteredOffers}
          handleRetractOffer={handleRetractOffer}
        />
      ) : (
        <p>you have no offers at the moment</p>
      )}
    </div>
  );
}

function FilteredOfferList({ offers, handleRetractOffer }) {
  return (
    <div>
      {offers.map((offer, idx) => {
        return (
          <div>
            {idx !== 0 ? <Divider /> : null}
            <OfferSummary
              bid={offer.bid}
              ask={offer.ask}
              asker={offer.offerTo}
              bidder={offer.offerFrom}
            />
            <Button onClick={() => handleRetractOffer(offer.offerId)}>
              Retract offer
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default AcceptOffer;
