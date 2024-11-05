/**
 * @Created 2024-10-27
 * @Brief The level progress bar view of a vendor.
 */

import React, { useEffect, useState } from "react";
import "./levelBar.css";
import { IVendorReputation } from "combatcritters-ts";

interface LevelBarProps {
  vendorReputation: IVendorReputation;
  vendorLevel?: number;
  vendorLevelProgress?: number;
  onLevelUp?: () => Promise<void>;
  scale?: number; //Scales both the length and height
  scaleLength?: number; //Strictly scales the length of the progress bar
}

const LevelBar: React.FC<LevelBarProps> = ({
  vendorReputation,
  vendorLevel = vendorReputation.level,
  vendorLevelProgress = ((vendorReputation.current_xp -
    vendorReputation.prev_level_xp) /
    (vendorReputation.next_level_xp - vendorReputation.prev_level_xp)) *
    100,
  onLevelUp = () => {},
  scale = 1,
  scaleLength = 1,
}) => {
  const WIDTH = 300 * scale * scaleLength; //Default width * scale * scaleLength
  const HEIGHT = 30 * scale; //Default height * scale
  // On level up, callback to the parent component.
  useEffect(() => {
    const levelUp = async () => {
      try {
        await onLevelUp();
      } catch (error) {
        console.log("Error on level up: " + error);
      }
    };
    levelUp();
  }, [vendorLevel]);

  return (
    <div
      className="levelBarRoot"
      style={{ width: `${WIDTH}px`, height: `${HEIGHT}px` }}
    >
      <div className="currAndNextLevelContainer">{vendorLevel}</div>
      <div className="progressBar">
        {" "}
        <div
          className="progressFill"
          style={{
            width: `${vendorLevelProgress}%`,
          }}
        ></div>
      </div>
      <div className="currAndNextLevelContainer">{vendorLevel + 1}</div>
    </div>
  );
};

export default LevelBar;
