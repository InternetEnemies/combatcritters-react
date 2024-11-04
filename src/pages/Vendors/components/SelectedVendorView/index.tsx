/**
 * @Created 2024-10-22
 * @Brief The vendor view that is displayed on the SelectedVendor component.
 */

import { IVendor, IVendorReputation } from "combatcritters-ts";
import "./selectedVendorView.css";
import LevelBar from "../LevelBar";
import Refresh from "../Refresh";

interface SelectedVendorViewProps {
  //Not the most elegant solution. I am passing this here because I need to
  //re-render whenever the vendor reputation changes.
  vendorReputation: IVendorReputation;
  vendor: IVendor;
}

const SelectedVendorView: React.FC<SelectedVendorViewProps> = ({
  vendorReputation,
  vendor,
}) => {
  const LEVEL_BAR_SCALE = 2;
  return (
    <div className="selectedVendorViewRoot">
      <div className="selectedVendorImageWrapper">
        <img
          className="selectedVendorImage"
          src="assets/images/testVendor.webp"
          alt="Vendor"
        />
      </div>

      <div className="nameRepResetContainer">
        <div className="nameResetContainer">
          <span className="vendorName">{vendor.name}</span>
          <div className="refreshTimeWrapper">
            <Refresh refreshTime={vendor.refrest_time} style={{color:"var(--custom-black)"}}/>
          </div>
        </div>
        <div className="levelBarWrapper">
          <LevelBar reputation={vendorReputation} scaleLength={LEVEL_BAR_SCALE}/>
        </div>
      </div>
    </div>
  );
};

export default SelectedVendorView;
