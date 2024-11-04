/**
 * @Created 2024-10-27
 * @Brief The level progress bar view of a vendor.
 */

import React, { useEffect, useState } from "react";
import "./levelBar.css";
import { IVendorReputation } from "combatcritters-ts";

interface LevelBarProps {
  reputation: IVendorReputation;
  scale?: number; //Scales both the length and height
  scaleLength?: number; //Strictly scales the length of the progress bar
}

const LevelBar: React.FC<LevelBarProps> = ({
  reputation,
  scale = 1,
  scaleLength = 1,
}) => {
  const WIDTH = 300 * scale * scaleLength; //Default width * scale * scaleLength
  const HEIGHT = 30 * scale; //Default height * scale

  const [progressPercentage, setProgressPercentage] = useState<number>(0);



  // On reputation change, update the progress bar.
  useEffect(() => {
    setProgressPercentage(
      (reputation.current_xp / reputation.next_level_xp) * 100
    );
  }, [reputation]);

  return (
    <div
      className="levelBarRoot"
      style={{ width: `${WIDTH}px`, height: `${HEIGHT}px` }}
    >
      <div className="currAndNextLevelContainer">{reputation.level}</div>
      <div className="progressBar">
        {" "}
        <div
          className="progressFill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="currAndNextLevelContainer">{reputation.level + 1}</div>
    </div>
  );
};

export default LevelBar;
