/**
 * @Created 2024-10-29
 * @Brief Popup displaying validity details of a deck.
 */

import React from "react";
import "./validityPopup.css";
import { IDeckValidity } from "combatcritters-ts";

interface ValidityPopupProps {
  deckValidity: IDeckValidity | null;
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
}

const ValidityPopup: React.FC<ValidityPopupProps> = ({
  deckValidity,
  showPopup,
  setShowPopup,
}) => {
  if (!showPopup) {
    return null;
  }

  const handleOverlayClick = () => {
    setShowPopup(false);
  };

  return (
    <div className="validityPopupRoot" onClick={handleOverlayClick}>
      <div className="popupContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={() => setShowPopup(false)}>
          &times;
        </button>
        <span>Deck Issues:</span>
        {deckValidity ? (
          <ul>
            {deckValidity.issues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        ) : (
          <p>No issues found.</p>
        )}
      </div>
    </div>
  );
};

export default ValidityPopup;
