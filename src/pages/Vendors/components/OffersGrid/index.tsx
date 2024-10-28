/**
 * @Created 2024-10-24
 * @Brief Offers grid displaying all the offers a vendor has to offer.
 */

import { IDiscountOffer, IOffer, ISpecialOffer } from "combatcritters-ts";
import Offer from "../Offer";
import "./offersGrid.css";
import SpecialOffer from "../SpecialOffer";
import DiscountOffer from "../DiscountOffer";

interface OffersGridProps {
  offers: IOffer[];
  specialOffers: ISpecialOffer[];
  discountOffers: IDiscountOffer[];
  setSelectedOffer: (offer: IOffer) => void;
}

const OffersGrid: React.FC<OffersGridProps> = ({
  offers,
  specialOffers,
  discountOffers,
  setSelectedOffer,
}) => {
  return (
    <div className="offersGridRoot">
      {specialOffers.map((specialOffer, index) => {
        return (
          <SpecialOffer
            key={specialOffer.offerID}
            specialOffer={specialOffer}
            onClick={setSelectedOffer}
          />
        );
      })}
      {discountOffers.map((discountOffer, index) => {
        return (
          <DiscountOffer
            key={discountOffer.offerID}
            discountOffer={discountOffer}
            onClick={setSelectedOffer}
          />
        );
      })}
      {offers.map((offer, index) => {
        return (
          <Offer key={offer.offerID} offer={offer} onClick={setSelectedOffer} />
        );
      })}
    </div>
  );
};

export default OffersGrid;
