/**
 * @Created 2024-10-07
 * @Brief General switch/toggle component.
 */

import React from "react";
import "./switch.css";

interface SwitchProps {
  isLeftToggled: boolean;
  setIsLeftToggled: (isToggled: boolean) => void;
  leftOption: string;
  rightOption: string;
}

const Switch: React.FC<SwitchProps> = ({
  isLeftToggled,
  setIsLeftToggled,
  leftOption,
  rightOption,
}) => {
  const handleLeftClick = () => {
    setIsLeftToggled(true);
  };

  const handleRightClick = () => {
    setIsLeftToggled(false);
  };

  return (
    <div className="switchRoot">
      <span
        className={`option leftOption ${isLeftToggled ? "active" : "notActive"}`}
        onClick={handleLeftClick}
      >
        {leftOption}
      </span>

      <span
        className={`option rightOption ${!isLeftToggled ? "active" : "notActive"}`}
        onClick={handleRightClick}
      >
        {rightOption}
      </span>
    </div>
  );
};

export default Switch;
