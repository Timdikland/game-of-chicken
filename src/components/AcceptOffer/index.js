import React, { useContext } from "react";
import { Divider } from "semantic-ui-react";

import { FirebaseContext } from "../../context/firebase";
import { UserContext } from "../../context/user";
import { GameContext } from "../../context/game";

import OfferSummary from "../OfferSummary";

import filterOffers from "./filterOffers";

function AcceptOffer() {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const game = useContext(GameContext);

  const filteredOffers = filterOffers(game, user.uid);

  return (
    <div>
      {!!filteredOffers ? (
        <FilteredOfferList offers={filteredOffers} />
      ) : (
        <p>you have no offers at the moment</p>
      )}
    </div>
  );
}

function FilteredOfferList({ offers }) {
  console.log(offers);
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
          </div>
        );
      })}
    </div>
  );
}

export default AcceptOffer;
