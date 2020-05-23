const filterOtherPlayers = (players, userId) => {
  const oldPlayerIdList = Object.keys(players);
  const playerIdList = [];
  oldPlayerIdList.forEach((playerId) => {
    if (playerId !== userId) {
      playerIdList.push(playerId);
    }
  });
  let filteredPlayers = {};
  playerIdList.forEach((id) => (filteredPlayers[id] = players[id]));
  return filteredPlayers;
};

export const createOfferToList = (players, userId) => {
  const filteredPlayers = filterOtherPlayers(players, userId);
  const offerToList = [];
  if (!!filteredPlayers) {
    Object.keys(filteredPlayers).forEach((key) => {
      const offerTo = {
        key: filteredPlayers[key].displayName,
        text: filteredPlayers[key].displayName,
        value: key,
      };
      offerToList.push(offerTo);
    });
  }
  return offerToList;
};
