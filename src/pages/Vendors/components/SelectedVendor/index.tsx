/**
 * @Created 2024-10-22
 * @Brief Separate page for the selected vendor.
 */

import { IOffer, IVendor, IVendorReputation } from "combatcritters-ts";
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
  //TODO uncomment this
  // const [discountOffers, setDiscountOffers] = useState<IDiscountOffer[]>([]);
  // const [specialOffers, setSpecialOffers] = useState<ISpecialOffer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<IOffer | null>(null);
  const [vendorReputation, setVendorReputation] = useState<IVendorReputation>();
  const [vendorLevel, setVendorLevel] = useState<number>(0);
  const [vendorLevelProgress, setVendorLevelProgress] = useState<number>(0);

  /*
    On vendor select, fetch and set all the different types of offers from the selectedVendor.
  */
  useEffect(() => {
    setSelectedOffer(null); //There shouldn't be any selectedOffer when a new vendor has been selected.
    fetchAndSetOffers();
    if (selectedVendor) {
      updateReputation(selectedVendor.reputation);
      console.log("Curr time: " + Date.now());
      console.log(
        "Refresh time: " + new Date(selectedVendor.refrest_time).getTime()
      );
      console.log("Refresh time string: " + selectedVendor.refrest_time);
    }
  }, [selectedVendor]);

  /**
   *
   * @param reputation
   */
  const updateReputation = (reputation: IVendorReputation) => {
    setVendorReputation(reputation);
    setVendorLevel(reputation.level);
    setVendorLevelProgress(
      ((reputation.current_xp - reputation.prev_level_xp) /
        (reputation.next_level_xp - reputation.prev_level_xp)) *
        100
    );
  };

  const fetchAndSetOffers = async () => {
    if (selectedVendor) {
      const offers = await selectedVendor.getOffers();
      //TODO uncomment this
      // const specialOffers = await selectedVendor.getSpecialOffers();
      // const discountOffers = await selectedVendor.discountOffers();
      setOffers(offers);
      //TODO uncomment this
      // setSpecialOffers(specialOffers);
      // setDiscountOffers(discountOffers);
    } else {
      setOffers([]);
    }

    refreshVendorReputation();
  };

  // const handleButtonClick = () => {
  //   setSelectedVendor(null);
  // };

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
      <button
        onClick={() => {
          setSelectedVendor(null);
        }}
        className="vendorSelectionButton"
      >
        Vendor Selection
      </button>
      <div className="vendorViewAndOffersContainer">
        <div className="vendorViewWrapper">
          {selectedVendor && vendorReputation ? (
            <SelectedVendorView
              vendor={selectedVendor}
              vendorReputation={vendorReputation}
              vendorLevel={vendorLevel}
              vendorLevelProgress={vendorLevelProgress}
              onLevelUp={fetchAndSetOffers}
            />
          ) : null}
        </div>
        <hr className="separator" style={{ alignSelf: "center" }}></hr>
        <div className="offersGridWrapper">
          <OffersGrid
            //TODO uncomment these once specials and discounts are finished
            // discountOffers={discountOffers}
            // specialOffers={specialOffers}
            discountOffers={[]}
            specialOffers={[]}
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
