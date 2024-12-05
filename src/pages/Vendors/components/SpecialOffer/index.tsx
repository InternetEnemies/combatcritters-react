/**
 * @Created 2024-10-28
 * @Brief View for special offers--displays the received item with special in the corner.
 */

import React from "react";
import { IOffer } from "combatcritters-ts/src/objects";
import { ISpecialOffer } from "combatcritters-ts";
import "./specialOffer.css";
import Offer from "../Offer";

interface SpecialOfferProps {
  specialOffer: ISpecialOffer;
  onClick?: (offer: IOffer) => void;
}

const SpecialOffer: React.FC<SpecialOfferProps> = ({
  specialOffer,
  onClick = () => {},
}) => {
  return (
    <div className="specialOfferContainer">
      <div className="specialIconWrapper" onClick={() => onClick(specialOffer)}>
        <img
          src="assets/images/special.svg"
          alt="Special"
          className="specialIcon"
        />
        <span className="specialText">Special</span>
      </div>
      <Offer offer={specialOffer} onClick={onClick} />
    </div>
  );
};

export default SpecialOffer;
