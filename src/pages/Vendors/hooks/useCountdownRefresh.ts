import { useEffect, useState } from "react";
import {
  calculateCountdown,
  isCountdownComplete,
} from "pages/Vendors/utils/timeUtils";
import { IVendor } from "combatcritters-ts";
import { ClientSingleton } from "ClientSingleton";

const useCountdownRefresh = (
  vendor: IVendor | null,
  onRefresh: () => void = () => {}
) => {
  const POLLING_FREQ = 1000; // Polling frequency in ms
  const [refreshTime, setRefreshTime] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [countdownFinished, setCountdownFinished] = useState(false);

  // Set the vendor's refresh time when a new vendor is selected
  useEffect(() => {
    setRefreshTime(vendor ? vendor.refrest_time : null);
  }, [vendor]);

  // Update countdown every second
  useEffect(() => {
    if (!vendor || !refreshTime) return;

    const interval = setInterval(() => {
      const timeLeft = calculateCountdown(refreshTime);
      setCountdown(timeLeft);
      setCountdownFinished(isCountdownComplete(timeLeft));
    }, 1000);

    return () => clearInterval(interval);
  }, [refreshTime, vendor]);

  // Poll for vendor refresh when countdown finishes
  useEffect(() => {
    if (!vendor || !countdownFinished) return;

    const interval = setInterval(async () => {
      try {
        const fetchedVendor: IVendor =
          await ClientSingleton.getInstance().vendors.getVendor(vendor.id);
        setRefreshTime(fetchedVendor.refrest_time);

        if (
          !isCountdownComplete(calculateCountdown(fetchedVendor.refrest_time))
        ) {
          setCountdownFinished(false);
          onRefresh();
        }
      } catch (error) {
        console.error("Error fetching vendor: ", error);
      }
    }, POLLING_FREQ);

    return () => clearInterval(interval);
  }, [countdownFinished, vendor, onRefresh]);

  return { countdown };
};

export default useCountdownRefresh;
