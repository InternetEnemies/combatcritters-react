/**
 * @Created 2024-10-22
 * @Brief Hook used for fetching vendors, managing selected vendor and switching between
 *        SelectedVendor and VendorSelection components.
 */

import { ClientSingleton } from "ClientSingleton";
import { IVendor } from "combatcritters-ts";
import { useEffect } from "react";
import { useState } from "react";

export const useVendors = () => {
  const [vendors, setVendors] = useState<IVendor[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<IVendor | null>(null);
  const [vendorSelectionVisible, setVendorSelectionVisible] =
    useState<boolean>(true);
  const [selectedVendorVisible, setSelectedVendorVisible] =
    useState<boolean>(false);

    const fetchVendors = async () => {
      try {
        const fetchedVendors =
          await ClientSingleton.getInstance().vendors.getVendors();
        setVendors(fetchedVendors);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    }
  /*
    On mount, fetch the vendors.
  */
  useEffect(() => {
    fetchVendors();
  }, []);

  /*
    When the selectedVendor becomes null, show the VendorSelection component.
    When there is a newly selectedVendor, show the SelectedVendor component.
  */
  useEffect(() => {
    if (selectedVendor) {
      setSelectedVendorVisible(true);
      setVendorSelectionVisible(false);
    } else {
      setSelectedVendorVisible(false);
      setVendorSelectionVisible(true);
      fetchVendors();
    }
  }, [selectedVendor]);

  return {
    vendors,
    selectedVendor,
    setSelectedVendor,
    vendorSelectionVisible,
    selectedVendorVisible,
  };
};
