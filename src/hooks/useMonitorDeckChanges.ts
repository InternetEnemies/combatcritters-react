import { useState, useEffect } from "react";
import { ISortableDeck } from "interfaces/ISortableDeck";
import { IDeck } from "combatcritters-ts/src/objects";

export const useMonitorDeckChanges = (
  localDeck: ISortableDeck | null,
  selectedDeck: IDeck | null
) => {
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    if (localDeck && selectedDeck) {
      const hasChanges = (): boolean => {
        if (localDeck.name !== selectedDeck.name) {
          return changesMade;
        }

        if (localDeck.cards.length === 0 && selectedDeck.cards.length === 0) {
          return false; 
        }
        if (localDeck.cards.length !== selectedDeck.cards.length) {
          return true;
        }

        return localDeck.cards.some((localCard, index) => {
          const selectedCard = selectedDeck.cards[index];
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
  }, [localDeck, selectedDeck, changesMade]);

  return changesMade;
};
