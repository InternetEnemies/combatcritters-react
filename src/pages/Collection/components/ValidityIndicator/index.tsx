/**
 * @Created 2024-10-29
 * @Brief Deck validity indicator.
 */

import React, { useState, useEffect, useRef } from "react";
import "./validityIndicator.css";
import { ISortableDeck } from "interfaces/ISortableDeck";
import { DeckValidity, ICard, IDeckValidity } from "combatcritters-ts";
import { ClientSingleton } from "ClientSingleton";
import ValidityPopup from "../ValidityPopup";
import { toast } from "react-toastify";

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
    if (localDeck) {
      //TODO uncomment this
      //
      // const cards: ICard[] = localDeck.cards.map((card) => {
      //   return card.card;
      // });
      // setDeckValidity(ClientSingleton.getInstance().user.decks.deckValidator.validate(cards));
      setDeckValidity(
        new DeckValidity(Math.random() < 0.5, [
          "Issue2",
          "Issjkhkjhkkkjhkkhkjkhkhjkkhhkue3",
          "Issue4",
          "irsfsd",
          "Issue1",
          "Issue # fjdslfdsfjlk",
        ])
      );
    }
  }, [localDeck]);

  if (!localDeck || !deckValidity) {
    return <div></div>;
  }

  const handleClick = () => {
    deckValidity.isValid ? (toast("Deck is Valid")) : (setShowPopup(true));
  }

  return (
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
      <ValidityPopup deckValidity={deckValidity} showPopup={showPopup} setShowPopup={setShowPopup}/>
    </div>
  );
};

export default ValidityIndicator;
