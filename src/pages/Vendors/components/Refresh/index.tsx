/**
 * @Created 2024-10-22
 * @Brief Countdown component.
 */
import React, { useEffect, useState } from "react";
import { calculateCountdown } from "utils/time";
import "./refresh.css";

interface RefreshProps {
  refreshTime: string;
}

const Refresh: React.FC<RefreshProps> = ({ refreshTime }) => {
  const [countdown, setCountdown] = useState("00:00:00");

  /*
    Calculate countdown immediately on mount and then update countdown every second.
  */
  useEffect(() => {
    // Immediately calculate the countdown on mount.
    setCountdown(calculateCountdown(refreshTime));

    const interval = setInterval(() => {
      // Update the countdown every second
      setCountdown(calculateCountdown(refreshTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [refreshTime]);

  return (
    <div className="refreshRoot">
      <img
        className="refreshIcon"
        src="assets/images/refresh.svg"
        alt="Refresh icon"
      />
      <span>{countdown}</span>
    </div>
  );
};

export default Refresh;
