export const createOfferToList = (players) => {
  const offerToList = [
    {
      key: "Everyone",
      text: "Everyone",
      value: Object.keys(players),
    },
  ];
  Object.keys(players).forEach((key) => {
    const offerTo = {
      key: players[key].displayName,
      text: players[key].displayName,
      value: [key],
    };
    offerToList.push(offerTo);
  });
  return offerToList;
};
