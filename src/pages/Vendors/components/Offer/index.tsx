/**
 * @Created 2024-10-24
 * @Brief The offer in OffersGrid.
 */

import React from "react";
import { IOffer } from "combatcritters-ts/src/objects";
import Item from "components/Item";

interface OfferProps {
  offer: IOffer;
  onClick?: (offer: IOffer) => void;
}

const Offer: React.FC<OfferProps> = ({ offer, onClick = () => {} }) => {
  const handleClick = () => {
    onClick(offer);
  };

  return (
    <div onClick={handleClick}>
      <Item item={offer.receiveItem.getItem()} />
    </div>
  );
};

export default Offer;
