import React from "react";

import IncomingOffer from "../IncomingOffer";

function ManageOffers() {
  const offers = [
    {
      ask: [0, 0, 0, 1],
      asker: "Tim",
      bid: [0, 1, 0, 0],
      bidder: "Max",
      offerId: "abc",
    },
    {
      ask: [0, 0, 0, 1],
      asker: "Tim",
      bid: [0, 1, 0, 0],
      bidder: "Max",
      offerId: "qwe",
    },
  ];

  const items = ["red", "yellow", "green", "blue"];
  return (
    <div>
      {offers.map((val, idx) => {
        return (
          <IncomingOffer
            ask={val.ask}
            asker={val.asker}
            bid={val.bid}
            bidder={val.bidder}
            offerId={val.offerId}
            items={items}
          />
        );
      })}
    </div>
  );
}

export default ManageOffers;
