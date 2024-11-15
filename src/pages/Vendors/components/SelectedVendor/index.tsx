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
import { calcRepProgress } from "pages/Vendors/utils/levelBarUtils";
import useCountdownRefresh from "pages/Vendors/hooks/useCountdownRefresh";

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

  const onVendorRefresh = () => {
    fetchAndSetOffers();
    setSelectedOffer(null);
  };
  
  const {countdown} = useCountdownRefresh(selectedVendor, onVendorRefresh);

  /*
    On vendor select, fetch and set all the different types of offers from the selectedVendor.
  */
  useEffect(() => {
    setSelectedOffer(null); //There shouldn't be any selectedOffer when a new vendor has been selected.
    fetchAndSetOffers();
    if (selectedVendor) {
      updateReputation(selectedVendor.reputation);
    }
    //eslint-disable-next-line
  }, [selectedVendor]);

  /**
   * Sets the various repution states.
   * 
   * @param reputation Reputation of the vendor.
   */
  const updateReputation = (reputation: IVendorReputation) => {
    setVendorReputation(reputation);
    setVendorLevel(reputation.level);
    setVendorLevelProgress(
      calcRepProgress(reputation)
    );
  };

  /**
   * Re-render vendorReputation
   */
  const refreshVendorReputation = () => {
    if (selectedVendor) {
      setVendorReputation(selectedVendor.reputation);
    }
  };

  const fetchAndSetOffers = async () => {
    if (selectedVendor) {
      const offers = await selectedVendor.getOffers();
      //TODO uncomment this
      //https://github.com/InternetEnemies/combatcritters-react/issues/54
      // const specialOffers = await selectedVendor.getSpecialOffers();
      // const discountOffers = await selectedVendor.discountOffers();
      setOffers(offers);
      //TODO uncomment this
      //https://github.com/InternetEnemies/combatcritters-react/issues/54
      // setSpecialOffers(specialOffers);
      // setDiscountOffers(discountOffers);
    } else {
      setOffers([]);
    }

    refreshVendorReputation();
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
              onLevelUp={fetchAndSetOffers} //On level up, refresh all the offers
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
          onOfferAccept={updateReputation}
        />
      </div>
    </div>
  );
};

export default SelectedVendor;
