/**
 * @Created 2024-10-22
 * @Brief Vendors page component.
 */

import { useVendors } from "./hooks/useVendors";
import SelectedVendor from "./components/SelectedVendor";
import VendorSelection from "./components/VendorSelection";
import "./vendors.css";

const Vendors = () => {
  const {
    vendors,
    selectedVendor,
    setSelectedVendor,
    vendorSelectionVisible,
    selectedVendorVisible,
  } = useVendors();

  return (
    <div className="vendorsRoot">
      <VendorSelection
        vendors={vendors}
        setSelectedVendor={setSelectedVendor}
        isVisible={vendorSelectionVisible}
      />
      <SelectedVendor
        isVisible={selectedVendorVisible}
        selectedVendor={selectedVendor}
        setSelectedVendor={setSelectedVendor}
      />
    </div>
  );
};

export default Vendors;
