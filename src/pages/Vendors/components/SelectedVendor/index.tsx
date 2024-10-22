/**
 * @Created 2024-10-22
 * @Brief Component for the selected vendor.
 */

import { IVendor } from "combatcritters-ts";
import "./selectedVendor.css";

interface SelectedVendorProps {
  isVisible: boolean;
  selectedVendor: IVendor | null;
  setSelectedVendor: (vendor: IVendor | null) => void;
}

const SelectedVendor: React.FC<SelectedVendorProps> = ({isVisible, selectedVendor, setSelectedVendor}) => {
  const handleButtonClick = () => {
    setSelectedVendor(null);
  }

  
  if(!isVisible) {
    return null;
  }

  return (
    <div className="selectedVendorRoot">
      <button onClick={handleButtonClick} className="vendorSelectionButton">Vendor Selection</button>
    </div>
  );
};

export default SelectedVendor;
