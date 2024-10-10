/**
 * @Created 2024-10-07
 * @Brief Hook that monitors if the localDeck matches the selectedDeck.
 */

import { useState, useEffect } from "react";
import { ISortableDeck } from "interfaces/ISortableDeck";
import { IDeck } from "combatcritters-ts/src/objects";

export const useMonitorDeckChanges = (
  localDeck: ISortableDeck | null,
  selectedDeck: IDeck | null
) => {
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    const checkForChanges = async () => {
      if (localDeck && selectedDeck) {
        const selectedDeckCards = await selectedDeck.getCards();

        const hasChanges = (): boolean => {
          if (localDeck.name !== selectedDeck.name) {
            return true;
          }

          if (localDeck.cards.length === 0 && selectedDeckCards.length === 0) {
            return false;
          }
          if (localDeck.cards.length !== selectedDeckCards.length) {
            return true;
          }

          return localDeck.cards.some((localCard, index) => {
            const selectedCard = selectedDeckCards[index];
            return (
              localCard.card.cardid !== selectedCard.cardid ||
              localCard.card.name !== selectedCard.name
            );
          });
        };

        setChangesMade(hasChanges());
      } else {
        setChangesMade(false);
      }
    };

    checkForChanges();
  }, [localDeck, selectedDeck]);

  return changesMade;
};
