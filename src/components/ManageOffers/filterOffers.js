function replaceUserIdByDisplayName(offerList, players) {
  const cleanedOffers = [];
  offerList.forEach((offer) => {
    const newOfferFrom = players[offer["offerFrom"]].displayName;
    const newOfferTo = players[offer["offerTo"]].displayName;
    cleanedOffers.push({
      ...offer,
      offerTo: newOfferTo,
      offerFrom: newOfferFrom,
    });
  });
  return cleanedOffers;
}

function filterOffers(game, userId) {
  if (game.offers) {
    const offerList = Object.values(game.offers);
    const filteredOffers = offerList.filter((off) => off.offerFrom === userId);
    return replaceUserIdByDisplayName(filteredOffers, game.players);
  } else {
    return null;
  }
}

export default filterOffers;
