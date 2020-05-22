export function subtractItemStates(itemState, deltaState) {
  let updatedState = { ...itemState };
  const keys = Object.keys(itemState);
  keys.forEach(
    (key) => (updatedState[key] = updatedState[key] - deltaState[key])
  );
  return updatedState;
}

export function filterRejectedOffers(offers, userId) {
  let offerList = Object.keys(offers);
  let filteredOffers = {};
  offerList.forEach((offerId) => {
    if (!!offers[offerId].declinedBy) {
      if (!Object.values(offers[offerId].declinedBy).includes(userId)) {
        filteredOffers[offerId] = offers[offerId];
      }
    } else {
      filteredOffers[offerId] = offers[offerId];
    }
  });
  return filteredOffers;
}

export function filterAcceptedOffers(offers, userId) {
  let offerList = Object.keys(offers);
  let filteredOffers = {};
  offerList.forEach((offerId) => {
    if (!!offers[offerId].acceptedBy) {
      if (!Object.values(offers[offerId].acceptedBy).includes(userId)) {
        filteredOffers[offerId] = offers[offerId];
      }
    } else {
      filteredOffers[offerId] = offers[offerId];
    }
  });
  return filteredOffers;
}

export function getActiveOffers(offers, userId) {
  const filter1 = filterAcceptedOffers(offers, userId);
  const filter2 = filterRejectedOffers(filter1, userId);
  return filter2;
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

export function validateOffer(offers, items, userId, newOffer) {
  const activeOffers = getActiveOffers(offers, userId);
  let isValid = true;
  if (!!activeOffers) {
    const availableItems = getAvailableItems(activeOffers, items, userId);
    Object.keys(availableItems).forEach((key) => {
      if (newOffer[key] > availableItems[key]) {
        isValid = false;
      } else if (newOffer[key] < 0) {
        isValid = false;
      }
    });
  }
  return isValid;
}

export function validateOnlyNegative(newOffer) {
  let isValid = true;
  const keyList = Object.keys(newOffer);
  keyList.forEach((key) => {
    if (newOffer[key] < 0) {
      isValid = false;
    }
  });
  return isValid;
}

export default validateOffer;
