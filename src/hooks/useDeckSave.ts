import { useState } from "react";
import { IDeck } from "combatcritters-ts/src/objects";
import { ISortableDeck } from "interfaces/ISortableDeck";
import { convertToSortableDeck } from "utils/collectionUtils";

export const useDeckSave = (
  localDeck: ISortableDeck | null,
  setLocalDeck: (deck: ISortableDeck) => void,
  selectedDeck: IDeck | null,
  setSelectedDeck: (deck: IDeck) => void,
  triggerToast: (msg: string) => void
) => {
  // const [changesMade, setChangesMade] = useState(false);

  // const saveDeck = async () => {
  //   if (selectedDeck && localDeck) {
  //     selectedDeck.cards = localDeck.cards.map((card) => ({ ...card.card })); 

  //     triggerToast("Deck Saved!");

  //     setLocalDeck(convertToSortableDeck(selectedDeck)); 
  //     setSelectedDeck({ ...selectedDeck });

  //     setChangesMade(false);
  //   } else {
  //     console.error("No deck selected or local deck is not set.");
  //   }
  // };

  // const cancelChanges = () => {
  //   if (selectedDeck && changesMade) {
  //     setLocalDeck(convertToSortableDeck(selectedDeck));
  //   }
  // };

  return {
    // saveDeck,
    // cancelChanges,
    // changesMade,
  };
};
