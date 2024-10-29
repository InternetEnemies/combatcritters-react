/**
 * @Created 2024-10-29
 * @Brief Deck validity indicator.
 */

import React, { useState, useEffect, useRef } from "react";
import "./validityIndicator.css";
import { ISortableDeck } from "interfaces/ISortableDeck";
import { ICard } from "combatcritters-ts";
import { ClientSingleton } from "ClientSingleton";

interface ValidityIndicatorProps {
  localDeck: ISortableDeck | null;
}

const ValidityIndicator: React.FC<ValidityIndicatorProps> = ({ localDeck }) => {
  const [isValid, setIsValid] = useState<boolean>(false);

  /**
   * On localDeck change, update the validity indicator.
   */
  useEffect(() => {
    if (localDeck) {
      const cards: ICard[] = localDeck.cards.map((card) => {
        return card.card;
      });
      //TODO uncomment this
      // setIsValid(ClientSingleton.getInstance().user.decks.deckValidator.validate(cards).isValid);
      setIsValid(Math.random() <.5);
    }
  }, [localDeck]);

  if (!localDeck) {
    return <div></div>;
  }

  return (
    <div className="validityIndicatorRoot">
      {isValid ? (
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
  );
};

export default ValidityIndicator;
