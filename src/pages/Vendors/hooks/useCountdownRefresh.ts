// useCountdown.ts
import { useEffect, useState } from "react";
import {
  calculateCountdown,
  isCountdownComplete,
} from "pages/Vendors/utils/timeUtils";
import { IVendor } from "combatcritters-ts";
import { toast } from "react-toastify";
import { count } from "console";
import { ClientSingleton } from "ClientSingleton";

const useCountdownRefresh = (
  vendor: IVendor | null,
  onRefresh: () => void = () => {}
) => {
  const POLLING_FREQ = 100; //Polling frequency in ms
  const tempRefreshTime = "2024-11-06T14:52:30";
  const tempFutureTime = "2024-11-06T18:52:30";
  const [refreshTime, setRefreshTime] = useState<string>(tempRefreshTime);
  const [countdown, setCountdown] = useState(
    calculateCountdown(tempRefreshTime)
  );
  const [countdownFinished, setCountdownFinished] = useState(false);

  useEffect(() => {
    if (!vendor) {
      return;
    }
    // setCountdown(calculateCountdown(vendor.refrest_time));

    const interval = setInterval(() => {
      if (isCountdownComplete(countdown)) {
        setCountdownFinished(true);
      }

      setCountdown(calculateCountdown(refreshTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown, refreshTime]);

  useEffect(() => {
    if (!vendor || !countdownFinished) {
      return;
    }

    const interval = setInterval(() => {
      const fetchVendor = async () => {
        try {
          const fetchedVendor: IVendor =
            await ClientSingleton.getInstance().vendors.getVendor(vendor.id);
          if (!isCountdownComplete(fetchedVendor.refrest_time)) {
            setRefreshTime(fetchedVendor.refrest_time);
            setCountdownFinished(false);
            onRefresh();
          }
        } catch (error) {
          console.log("Error fetching vendor: " + error);
        }
      };
      fetchVendor();
    }, POLLING_FREQ);

    return () => clearInterval(interval);
  }, [countdownFinished]);

  return { countdown };
};

export default useCountdownRefresh;
