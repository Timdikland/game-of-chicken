import React, { useContext } from "react";

import { GameContext } from "../../context/game";
import { ITEMS } from "../../constants/gameItems";

import IncomingOffer from "../IncomingOffer";

function ManageOffers() {
  const game = useContext(GameContext);
  const offers = Object.values(game.offers);
  const players = game.players;

  return (
    <div>
      {!!offers ? (
        <NonEmptyOfferList offers={offers} players={players} />
      ) : (
        <EmptyOfferList />
      )}
    </div>
  );
}

function NonEmptyOfferList({ offers, players }) {
  return (
    <div>
      {offers.map((val, idx) => {
        return (
          <IncomingOffer
            ask={val.ask}
            asker={players[val.offerTo[0]].displayName}
            bid={val.bid}
            bidder={val.OfferFrom}
            offerId={val.offerId}
          />
        );
      })}
    </div>
  );
}

function EmptyOfferList() {
  return <p> There are no offers for you</p>;
}

export default ManageOffers;
