/**
 * @Created 2024-10-22
 * @Brief The vendor view that is displayed on the SelectedVendor component.
 */

import { IVendor, IVendorReputation } from "combatcritters-ts";
import "./selectedVendorView.css";
import LevelBar from "../LevelBar";
import Refresh from "../Refresh";
import useCountdownRefresh from "pages/Vendors/hooks/useCountdownRefresh";
import { count } from "console";

interface SelectedVendorViewProps {
  vendorReputation: IVendorReputation;
  vendor: IVendor;
  vendorLevel: number;
  vendorLevelProgress: number;
  onLevelUp: () => Promise<void>;
}

const SelectedVendorView: React.FC<SelectedVendorViewProps> = ({
  vendorReputation,
  vendor,
  vendorLevel = vendorReputation.level,
  vendorLevelProgress,
  onLevelUp,
}) => {
  const LEVEL_BAR_SCALE = 2;
  const {countdown} = useCountdownRefresh(vendor);

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
            <Refresh
              countdown={countdown}
              style={{ color: "var(--custom-black)" }}
            />
          </div>
        </div>
        <div className="levelBarWrapper">
          <LevelBar
            vendorReputation={vendorReputation}
            vendorLevel={vendorLevel}
            vendorLevelProgress={vendorLevelProgress}
            onLevelUp={onLevelUp}
            scaleLength={LEVEL_BAR_SCALE}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectedVendorView;
