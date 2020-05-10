import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { FirebaseContext } from "../firebase";
import { UserContext } from "../user";

const GameContext = React.createContext(null);

export const withGame = (Component) => (props) => {
  const [offers, setOffers] = useState(null);
  const [items, setItems] = useState(null);
  const [values, setValues] = useState(null);
  const [players, setPlayers] = useState(null);

  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);

  const params = useParams();

  const userId = user.uid;
  const gameId = params.gameId;

  const onValueChange = (setState) => (snapshot) => {
    setState(snapshot.val());
  };

  useEffect(() => {
    firebase.gamePlayers(gameId).on("value", onValueChange(setPlayers));
    return firebase.gamePlayers(gameId).off("value", onValueChange(setPlayers));
  }, [firebase, gameId]);

  useEffect(() => {
    firebase.gameOffers(gameId).on("value", onValueChange(setOffers));
    return firebase.gameOffers(gameId).off("value", onValueChange(setOffers));
  }, [firebase, gameId]);

  useEffect(() => {
    firebase
      .gameItemsForUser(gameId, userId)
      .on("value", onValueChange(setItems));
    return firebase
      .gameItemsForUser(gameId, userId)
      .off("value", onValueChange(setItems));
  }, [firebase, gameId, userId]);

  useEffect(() => {
    firebase
      .gameValuesForUser(gameId, userId)
      .on("value", onValueChange(setValues));
    return firebase
      .gameValuesForUser(gameId, userId)
      .off("value", onValueChange(setValues));
  }, [firebase, gameId, userId]);

  const gameState = {
    offers: offers,
    items: items,
    values: values,
    players: players,
  };

  return (
    <GameContext.Provider value={gameState}>
      <Component {...props} />
    </GameContext.Provider>
  );
};

export default GameContext;
