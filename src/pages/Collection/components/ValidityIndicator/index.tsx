/**
 * @Created 2024-10-29
 * @Brief Deck validity indicator.
 */

import React, { useState, useEffect } from "react";
import "./validityIndicator.css";
import { ISortableDeck } from "interfaces/ISortableDeck";
import { ICard, IDeckValidity } from "combatcritters-ts";
import { ClientSingleton } from "ClientSingleton";
import ValidityPopup from "../ValidityPopup";
import { toast } from "react-toastify";
import Popup from "components/Popup";

interface ValidityIndicatorProps {
  localDeck: ISortableDeck | null;
}

const ValidityIndicator: React.FC<ValidityIndicatorProps> = ({ localDeck }) => {
  const [deckValidity, setDeckValidity] = useState<IDeckValidity | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  /**
   * On localDeck change, update the validity indicator.
   */
  useEffect(() => {
    const validateDeck = async () => {
      if (localDeck) {
        const cards: ICard[] = localDeck.cards.map((card) => card.card);

        const validity =
          await ClientSingleton.getInstance().user.decks.validator.validate(
            cards
          );

        setDeckValidity(validity);
      }
    };

    validateDeck();
  }, [localDeck]);

  /**
   * Don't display an indicator if there isn't a selected deck.
   */
  if (!localDeck || !deckValidity) {
    return <div></div>;
  }

  const handleClick = () => {
    deckValidity.isValid ? toast.success("Deck is Valid", {toastId: "validDeck"}) : setShowPopup(true);
    console.log("Indicator clicking");
  };

  return (
    <>
      <div className="validityIndicatorRoot" onClick={handleClick}>
        {deckValidity.isValid ? (
          <img
            src="assets/images/checkmark.svg"
            alt="Checkmark"
            className="validityIndicator"
          />
        ) : (
          <img
            src="assets/images/cross.svg"
            alt="Invalid"
            className="validityIndicator"
          />
        )}
      </div>
      <Popup
        popupContent={<ValidityPopup deckValidity={deckValidity} />}
        isVisible={showPopup}
        setIsVisible={setShowPopup}
      />
    </>
  );
};

export default ValidityIndicator;
