/**
 * @Created 2024-10-22
 * @Brief Component for the selected vendor.
 */

import { IItem, IOffer, IVendor } from "combatcritters-ts";
import "./selectedVendor.css";

interface OffersGridProps {
  offers: IOffer;
  setSelectedOffer: (offer: IOffer) => void;
}

const OffersGrid: React.FC<OffersGridProps> = ({
 
}) => {
 


  return (
    <div className="offersGridRoot">
    
    </div>
  );
};

export default OffersGrid;
