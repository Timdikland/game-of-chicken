export const createOfferToList = (players) => {
  const offerToList = [
    {
      key: "test",
      text: "test",
      value: "test",
    },
  ];
  Object.keys(players).forEach((key) => {
    const offerTo = {
      key: players[key].displayName,
      text: players[key].displayName,
      value: key,
    };
    offerToList.push(offerTo);
  });
  return offerToList;
};
