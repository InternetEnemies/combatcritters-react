/**
 * @Created 2024-10-22
 * @Brief Separate page for the selected vendor.
 */

import {
  IDiscountOffer,
  IOffer,
  ISpecialOffer,
  IVendor,
  IVendorReputation,
} from "combatcritters-ts";
import "./selectedVendor.css";
import { useEffect, useState } from "react";
import OffersGrid from "../OffersGrid";
import SelectedOffer from "../SelectedOffer";
import SelectedVendorView from "../SelectedVendorView";

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
  const [discountOffers, setDiscountOffers] = useState<IDiscountOffer[]>([]);
  const [specialOffers, setSpecialOffers] = useState<ISpecialOffer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<IOffer | null>(null);
  const [vendorReputation, setVendorReputation] = useState<IVendorReputation>();

  /*
    On vendor select, fetch all the different types of offers from the selectedVendor.
  */
  useEffect(() => {
    const fetchOffers = async () => {
      if (selectedVendor) {
        const offers = await selectedVendor.getOffers();
        const specialOffers = await selectedVendor.getSpecialOffers();
        const discountOffers = await selectedVendor.discountOffers();
        setOffers(offers);
        setSpecialOffers(specialOffers);
        setDiscountOffers(discountOffers);
        setVendorReputation(selectedVendor.reputation);
      } else {
        setOffers([]);
      }
    };
    setSelectedOffer(null); //There shouldn't be any selectedOffer when a new vendor has been selected.
    fetchOffers();
  }, [selectedVendor]);

  const handleButtonClick = () => {
    setSelectedVendor(null);
  };

  /**
   * Re-render vendorReputation
   */
  const refreshVendorReputation = () => {
    if (selectedVendor) {
      setVendorReputation(selectedVendor.reputation);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="selectedVendorRoot">
      <button onClick={handleButtonClick} className="vendorSelectionButton">
        Vendor Selection
      </button>
      <div className="vendorViewAndOffersContainer">
        <div className="vendorViewWrapper">
          {selectedVendor && vendorReputation ? (
            <SelectedVendorView
              vendor={selectedVendor}
              vendorReputation={vendorReputation}
            />
          ) : null}
        </div>
        <hr className="separator" style={{ alignSelf: "center"}}></hr>
        <div className="offersGridWrapper">
          <OffersGrid
            discountOffers={discountOffers}
            specialOffers={specialOffers}
            offers={offers}
            setSelectedOffer={setSelectedOffer}
          />
        </div>
      </div>
      <div className="selectedOfferWrapper">
        <SelectedOffer
          offer={selectedOffer}
          vendorName={selectedVendor ? selectedVendor.name : "Vendor"}
          refreshVendorReputation={refreshVendorReputation}
        />
      </div>
    </div>
  );
};

export default SelectedVendor;
