/**
 * @Created 2024-10-27
 * @Brief The level progress bar view of a vendor.
 */

import React, { useEffect } from "react";
import "./levelBar.css";
import { IVendorReputation } from "combatcritters-ts";
import { calcRepProgress } from "pages/Vendors/utils/levelBarUtils";

interface LevelBarProps {
  vendorReputation: IVendorReputation;
  vendorLevel?: number;
  vendorLevelProgress?: number;
  onLevelUp?: () => Promise<void>; //Optional callback to execute on vendor level up
  scale?: number; //Scales both the length and height
  scaleLength?: number; //Strictly scales the length of the progress bar
}

const LevelBar: React.FC<LevelBarProps> = ({
  vendorReputation,
  vendorLevel = vendorReputation.level,
  vendorLevelProgress = calcRepProgress(vendorReputation),
  onLevelUp = () => Promise.resolve(),
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
    //eslint-disable-next-line
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
