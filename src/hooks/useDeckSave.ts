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
  const [changesMade, setChangesMade] = useState(false);

  const saveDeck = async () => {
    if (selectedDeck && localDeck) {
      // Clear the selectedDeck's cards and add all cards from localDeck
      selectedDeck.cards = localDeck.cards.map((card) => ({ ...card.card })); // Synchronize decks

      triggerToast("Deck Saved!");

      // Ensure React updates both localDeck and selectedDeck references
      setLocalDeck(convertToSortableDeck(selectedDeck)); // Update the localDeck state
      setSelectedDeck({ ...selectedDeck }); // Update selectedDeck

      // Set changesMade to false because decks are now in sync
      setChangesMade(false);
    } else {
      console.error("No deck selected or local deck is not set.");
    }
  };

  const cancelChanges = () => {
    if (selectedDeck && changesMade) {
      setLocalDeck(convertToSortableDeck(selectedDeck));
    }
  };

  // useEffect(() => {
  //   if (localDeck && selectedDeck) {
  //     // Compare length first
  //     if (localDeck.cards.length !== selectedDeck.cards.length) {
  //       setChangesMade(true);
  //       return;
  //     }

  //     // Compare each card deeply
  //     const areDecksEqual = localDeck.cards.every((localCard, index) => {
  //       const selectedCard = selectedDeck.cards[index];
  //       return (
  //         localCard.card.cardid === selectedCard.cardid &&
  //         localCard.card.name === selectedCard.name // Example of a deeper comparison
  //       );
  //     });

  //     setChangesMade(!areDecksEqual);
  //   } else {
  //     setChangesMade(false);
  //   }
  // }, [localDeck, selectedDeck]);

  // useEffect(() => {
  //   if (localDeck && selectedDeck) {
  //     const areDecksEqual =
  //       localDeck.cards.length === selectedDeck.cards.length &&
  //       localDeck.cards.every((localCard, index) => {
  //         const selectedCard = selectedDeck.cards[index];
  //         return localCard.card.cardid === selectedCard.cardid;
  //       });

  //     setChangesMade(!areDecksEqual);
  //   } else {
  //     setChangesMade(false);
  //   }
  // }, [localDeck, selectedDeck]);

  return {
    saveDeck,
    cancelChanges,
    changesMade,
  };
};
