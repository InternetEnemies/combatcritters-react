/**
 * @Created 2024-10-22
 * @Brief The vendor view that is displayed on the VendorSelection component.
 */
import { IVendor } from "combatcritters-ts";
import "./vendorView.css";
import Refresh from "../Refresh";

interface VendorViewProps {
  onClick: (vendor: IVendor) => void;
  vendor: IVendor;
}

const VendorView: React.FC<VendorViewProps> = ({ onClick, vendor }) => {
  const handleClick = () => {
    onClick(vendor);
  };

  return (
    <div className="vendorViewRoot" onClick={handleClick}>
      {/* TODO: this will need to be changed to actually fetch vendor.image - not sure which issue that's associated with though */}
      <img
        className="vendorImage"
        src="assets/images/testVendor.webp"
        alt="Vendor"
      />
      <span>{vendor.name}</span>
      <div className="levelAndRefreshContainer">
        <span>lvl {vendor.reputation.level}</span>
        <br />
        {/* TODO: this should be refreshTime={vendor.refreshTime} once integrated */}
        {/* https://github.com/InternetEnemies/combatcritters-react/issues/58 */}
        <Refresh refreshTime="2024-10-22T20:16:59.879440" />
      </div>
    </div>
  );
};

export default VendorView;
