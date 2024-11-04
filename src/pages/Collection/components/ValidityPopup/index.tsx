/**
 * @Created 2024-10-29
 * @Brief Popup displaying validity details of a deck.
 */

import React from "react";
import "./validityPopup.css";
import { IDeckValidity } from "combatcritters-ts";

interface ValidityPopupProps {
  deckValidity: IDeckValidity | null;
}

const ValidityPopup: React.FC<ValidityPopupProps> = ({
  deckValidity,
}) => {

  return (
    <div className="validityPopupRoot" >
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
  );
};

export default ValidityPopup;
