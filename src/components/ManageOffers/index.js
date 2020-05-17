import React, { useContext } from "react";
import { Divider } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { GameContext } from "../../context/game";
import { UserContext } from "../../context/user";
import { FirebaseContext } from "../../context/firebase";

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
  };

  const handleDecline = (offerId) => {
    firebase.doDeclineOffer(params.gameId, offerId, user.uid);
  };

  return (
    <div>
      {!!offers ? (
        <NonEmptyOfferList
          offers={offers}
          players={players}
          handleAccept={handleAccept}
          handleDecline={handleDecline}
          userId={user.uid}
        />
      ) : (
        <EmptyOfferList />
      )}
    </div>
  );
}

function NonEmptyOfferList({
  offers,
  players,
  userId,
  handleAccept,
  handleDecline,
}) {
  const offerIdList = Object.keys(offers);

  return (
    <div>
      {offerIdList.map((offerId, idx) => {
        if (isVisible(offers[offerId], userId)) {
          return (
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
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

function isVisible(offer, userId) {
  let isVisible = true;
  let declinedList = [];
  let acceptedList = [];
  if (offer.declinedBy) {
    declinedList = Object.values(offer.declinedBy);
  }
  if (offer.acceptedBy) {
    acceptedList = Object.values(offer.acceptedBy);
  }
  if (declinedList.includes(userId) || acceptedList.includes(userId)) {
    isVisible = false;
  }
  return isVisible;
}

function EmptyOfferList() {
  return <p> There are no offers for you</p>;
}

export default ManageOffers;
