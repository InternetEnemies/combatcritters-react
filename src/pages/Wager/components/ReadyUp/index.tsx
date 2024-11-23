import React from "react";
import "./readyUp.css";

interface ReadyUpProps {
  isReady: boolean;
  setIsReady: (ready: boolean) => void;
}

const ReadyUp: React.FC<ReadyUpProps> = ({ isReady, setIsReady }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsReady(e.target.checked);
  };

  return (
    <label
      className={`readyUpContainer ${isReady ? "ready" : "notReady"}`}
      htmlFor="readyUpCheckbox"
    >
      <input
        type="checkbox"
        className="readyUpCheckbox"
        checked={isReady}
        onChange={handleCheckboxChange}
        id="readyUpCheckbox"
      />
      <span className="readyUpLabel">Ready Up</span>
    </label>
  );
};

export default ReadyUp;
