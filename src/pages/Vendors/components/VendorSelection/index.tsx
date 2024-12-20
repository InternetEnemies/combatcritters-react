/**
 * @Created 2024-10-22
 * @Brief This component features the different vendors (VendorViews) that the user is able to select from.
 */
import { IVendor } from "combatcritters-ts";
import "./vendorSelection.css";
import VendorView from "../SelectionVendorView";

interface VendorSelectionProps {
  isVisible: boolean;
  vendors: IVendor[];
  setSelectedVendor: (vendor: IVendor) => void;
}

const VendorSelection: React.FC<VendorSelectionProps> = ({
  isVisible,
  vendors,
  setSelectedVendor,
}) => {
  const handleVendorClick = (vendor: IVendor) => {
    setSelectedVendor(vendor);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="vendorSelectionRoot">
      <div className="vendorViewGrid">
        {vendors.map((vendor, index) => {
          return (
            <VendorView
              key={index}
              onClick={handleVendorClick}
              vendor={vendor}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VendorSelection;
