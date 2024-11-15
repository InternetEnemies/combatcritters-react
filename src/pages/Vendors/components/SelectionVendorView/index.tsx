/**
 * @Created 2024-10-22
 * @Brief The vendor view that is displayed on the VendorSelection component.
 */
import { IVendor } from "combatcritters-ts";
import "./selectionVendorView.css";
import Refresh from "../Refresh";
import LevelBar from "../LevelBar";
import useCountdownRefresh from "pages/Vendors/hooks/useCountdownRefresh";

interface SelectionVendorViewProps {
  onClick: (vendor: IVendor) => void;
  vendor: IVendor;
}

const SelectionVendorView: React.FC<SelectionVendorViewProps> = ({ onClick, vendor }) => {
  const {countdown} = useCountdownRefresh(vendor);
  const handleClick = () => {
    onClick(vendor);
  };

  return (
    <div className="selectionVendorViewRoot" onClick={handleClick}>
      {/* TODO: this will need to be changed to actually fetch vendor.image - not sure which issue that's associated with though */}
      <img
        className="vendorImage"
        src="assets/images/testVendor.webp"
        alt="Vendor"
      />
      <div className="vendorName">{vendor.name}</div>
      <Refresh countdown={countdown} style={{color:"var(--custom-white)"}}/>
      <LevelBar vendorReputation={vendor.reputation} scaleLength={.8} scale={.8}/>
    </div>
  );
};

export default SelectionVendorView;
