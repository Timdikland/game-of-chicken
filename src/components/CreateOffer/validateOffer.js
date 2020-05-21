function subtractItemStates(itemState, deltaState) {
  let updatedState = { ...itemState };
  const keys = Object.keys(itemState);
  keys.forEach(
    (key) => (updatedState[key] = updatedState[key] - deltaState[key])
  );
  return updatedState;
}

function getAvailableItems(offers, items, userId) {
  let availableItems = { ...items };
  if (!!offers) {
    const offerList = Object.values(offers);
    const filteredOfferList = offerList.filter(
      (offer) => offer.offerFrom === userId
    );
    filteredOfferList.forEach(
      (offer) =>
        (availableItems = subtractItemStates(availableItems, offer.bid))
    );
  }
  return availableItems;
}

export default getAvailableItems;
