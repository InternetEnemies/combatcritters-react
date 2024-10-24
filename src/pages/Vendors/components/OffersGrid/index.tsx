/**
 * @Created 2024-10-24
 * @Brief Offers grid displaying all the offers a vendor has to offer.
 */

import { IOffer } from "combatcritters-ts";
import Offer from "../Offer";
import "./offersGrid.css";

interface OffersGridProps {
  offers: IOffer[];
  setSelectedOffer: (offer: IOffer) => void;
}

const OffersGrid: React.FC<OffersGridProps> = ({
  offers,
  setSelectedOffer,
}) => {
  return (
    <div className="offersGridRoot">
      {offers.map((offer, index) => {
        return <Offer key={index} offer={offer} onClick={setSelectedOffer} />;
      })}
    </div>
  );
};

export default OffersGrid;
