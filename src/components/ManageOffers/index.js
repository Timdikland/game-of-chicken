import React, { useContext } from "react";
import { Divider } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { GameContext } from "../../context/game";
import { UserContext } from "../../context/user";
import { FirebaseContext } from "../../context/firebase";
import { ITEMS } from "../../constants/gameItems";

import IncomingOffer from "../IncomingOffer";

function ManageOffers() {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const game = useContext(GameContext);
  const params = useParams();
  const players = game.players;
  const offers = game.offers;

  const handleAccept = (offerId) => {
    firebase.doAcceptOffer(params.gameId, offerId, user.uid);
    console.log(offerId);
  };

  const handleDecline = (offerId) => {
    console.log(offerId);
  };

  return (
    <div>
      {!!offers ? (
        <NonEmptyOfferList
          offers={offers}
          players={players}
          handleAccept={handleAccept}
          handleDecline={handleDecline}
        />
      ) : (
        <EmptyOfferList />
      )}
    </div>
  );
}

function NonEmptyOfferList({ offers, players, handleAccept, handleDecline }) {
  const offerIdList = Object.keys(offers);

  return (
    <div>
      {offerIdList.map((offerId, idx) => (
        <div>
          <Divider />
          <IncomingOffer
            ask={offers[offerId].ask}
            asker={players[offers[offerId].offerTo].displayName}
            bid={offers[offerId].bid}
            bidder={players[offers[offerId].offerFrom].displayName}
            offerId={offerId}
            handleAccept={handleAccept}
            handleDecline={handleDecline}
          />
        </div>
      ))}
    </div>
  );
}

function EmptyOfferList() {
  return <p> There are no offers for you</p>;
}

export default ManageOffers;
