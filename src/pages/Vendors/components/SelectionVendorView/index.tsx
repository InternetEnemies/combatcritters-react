/**
 * @Created 2024-10-22
 * @Brief The vendor view that is displayed on the VendorSelection component.
 */
import { IVendor } from "combatcritters-ts";
import "./selectionVendorView.css";
import Refresh from "../Refresh";
import LevelBar from "../LevelBar";

interface SelectionVendorViewProps {
  onClick: (vendor: IVendor) => void;
  vendor: IVendor;
}

const SelectionVendorView: React.FC<SelectionVendorViewProps> = ({ onClick, vendor }) => {
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
      {/* TODO: this should be refreshTime={vendor.refreshTime} once integrated */}
      {/* https://github.com/InternetEnemies/combatcritters-react/issues/58 */}
      <Refresh refreshTime="2024-11-04T20:16:59.879440" style={{color:"var(--custom-white)"}}/>
      <LevelBar reputation={vendor.reputation} scaleLength={.8} scale={.8}/>
    </div>
  );
};

export default SelectionVendorView;
