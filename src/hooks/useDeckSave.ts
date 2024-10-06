import { useState } from "react";
import { useEffect } from "react";
import { ISortOption } from "interfaces/ISortOption";
import { CardOrder } from "api/cardOrder";
import { IDeck } from "combatcritters-ts/src/objects";
import { ISortableDeck } from "interfaces/ISortableDeck";
import DeckManager from "api/DeckManager";
import { convertToSortableDeck } from "utils/deckUtils";
import { useToast } from "./useToast";

export const useDeckSave = (
  localDeck: ISortableDeck | null,
  setLocalDeck: (deck: ISortableDeck) => void,
  selectedDeck: IDeck | null,
  triggerToast: (msg: string) => void,
) => {
  const [changesMade, setChangesMade] = useState(false);

  const saveDeck = async () => {
    console.log(selectedDeck);
    console.log(localDeck);
    if (selectedDeck && localDeck) {
      // Clear the selectedDeck's cards
      selectedDeck.cards = []; // Directly modify cards array
      // Add all cards from localDeck to selectedDeck
      localDeck.cards.forEach((card, index) => {
        selectedDeck.addCard(card.card, index);
      });

      triggerToast("Deck Saved!");

      // Ensure React updates the selectedDeck reference
      setLocalDeck(convertToSortableDeck(selectedDeck)); // Force state update
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



  useEffect(() => {
    if (localDeck && selectedDeck) {
      // Compare length first
      if (localDeck.cards.length !== selectedDeck.cards.length) {
        setChangesMade(true);
        return;
      }

      // Compare each card deeply (checking properties other than just cardid if necessary)
      const areDecksEqual = localDeck.cards.every((localCard, index) => {
        const selectedCard = selectedDeck.cards[index];
        return (
          localCard.card.cardid === selectedCard.cardid &&
          // Add more comparisons if other card properties are relevant
          localCard.card.name === selectedCard.name // Example of a deeper comparison
        );
      });

      setChangesMade(!areDecksEqual);
    } else {
      setChangesMade(false);
    }
  }, [localDeck, selectedDeck]);

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
    changesMade
  };
};
