/**
 * @Created 2024-10-22
 * @Brief Component for the selected vendor.
 */

import { IOffer, IVendor } from "combatcritters-ts";
import "./selectedVendor.css";
import { useEffect, useState } from "react";
import OffersGrid from "../OffersGrid";
import SelectedOffer from "../SelectedOffer";

interface SelectedVendorProps {
  isVisible: boolean;
  selectedVendor: IVendor | null;
  setSelectedVendor: (vendor: IVendor | null) => void;
}

const SelectedVendor: React.FC<SelectedVendorProps> = ({
  isVisible,
  selectedVendor,
  setSelectedVendor,
}) => {
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<IOffer | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      if (selectedVendor) {
        const offers = await selectedVendor.getOffers();
        setOffers(offers);
      } else {
        setOffers([]);
      }
    };

    fetchOffers();
  }, [selectedVendor]); 

  const handleButtonClick = () => {
    setSelectedVendor(null);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="selectedVendorRoot">
      <button onClick={handleButtonClick} className="vendorSelectionButton">
        Vendor Selection
      </button>
      <div className="vendorInfoAndOffersContainer">
        <div className="offersGridWrapper">
          <OffersGrid offers={offers} setSelectedOffer={setSelectedOffer} />
        </div>
      </div>
      <div className="selectedOfferWrapper">
        <SelectedOffer
          offer={selectedOffer}
          vendorName={selectedVendor ? selectedVendor.name : "Vendor"}
        />
      </div>
    </div>
  );
};

export default SelectedVendor;
