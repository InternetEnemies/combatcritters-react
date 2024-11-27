/**
 * @Created 2024-10-28
 * @Brief View for discount offers--displays the received item with the discount in the corner.
 */

import React from "react";
import { IOffer } from "combatcritters-ts/src/objects";
import { IDiscountOffer } from "combatcritters-ts";
import "./discountOffer.css";
import Offer from "../Offer";

interface DiscountOfferProps {
  discountOffer: IDiscountOffer;
  onClick?: (offer: IOffer) => void; //Callback function when clicked
}

const DiscountOffer: React.FC<DiscountOfferProps> = ({
  discountOffer,
  onClick = () => {},
}) => {
  return (
    <div className="discountOfferContainer">
      <span className="discountText" onClick={() => onClick(discountOffer)}>{discountOffer.discount}% Off!</span>
      <Offer offer={discountOffer} onClick={onClick} />
    </div>
  );
};

export default DiscountOffer;
