export function subtractItemStates(itemState, deltaState) {
  let updatedState = { ...itemState };
  const keys = Object.keys(itemState);
  keys.forEach(
    (key) => (updatedState[key] = updatedState[key] - deltaState[key])
  );
  return updatedState;
}

export function getAvailableItems(offers, items, userId) {
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

export function validateTrade(offers, items, userId, tradeOffer) {
  let isValid = true;
  if (!!offers) {
    const availableItems = getAvailableItems(offers, items, userId);
    Object.keys(availableItems).forEach((key) => {
      if (tradeOffer.ask[key] > availableItems[key]) {
        isValid = false;
      }
    });
  } else {
    const availableItems = { ...items };
    Object.keys(availableItems).forEach((key) => {
      if (tradeOffer.ask[key] > availableItems[key]) {
        isValid = false;
      }
    });
  }
  return isValid;
}

export default validateTrade;
