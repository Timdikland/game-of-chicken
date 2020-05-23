function replaceUserIdByDisplayName(offers, players) {
  const cleanedOffers = [];
  Object.keys(offers).forEach((offerId) => {
    const newOfferFrom = players[offers[offerId]["offerFrom"]].displayName;
    const newOfferTo = players[offers[offerId]["offerTo"]].displayName;
    cleanedOffers.push({
      ...offers[offerId],
      offerTo: newOfferTo,
      offerFrom: newOfferFrom,
      offerId: offerId,
    });
  });
  console.log("cleaned offers", cleanedOffers);
  return cleanedOffers;
}

function filterOffers(game, userId) {
  if (game.offers) {
    const offerIdList = Object.keys(game.offers);
    const filteredOfferIdList = offerIdList.filter(
      (offerId) => game.offers[offerId].offerFrom === userId
    );
    let filteredOffers = {};
    filteredOfferIdList.forEach((offerId) => {
      filteredOffers[offerId] = game.offers[offerId];
    });
    return replaceUserIdByDisplayName(filteredOffers, game.players);
  } else {
    return null;
  }
}

export default filterOffers;
