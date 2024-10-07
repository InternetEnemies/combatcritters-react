import { useState } from "react";
import { IDeck } from "combatcritters-ts/src/objects";
import { ISortableDeck } from "interfaces/ISortableDeck";
import DeckManager from "api/DeckManager";
import { useEffect } from "react";
import { convertToSortableDeck } from "utils/collectionUtils";

export const useDeckManage = () => {
  const [selectedDeck, setSelectedDeck] = useState<IDeck | null>(null);
  const [localDeck, setLocalDeck] = useState<ISortableDeck | null>(null);
  const [decks, setDecks] = useState<IDeck[]>();

  const saveDeck = async () => {
    if (selectedDeck && localDeck) {
      for (let i = selectedDeck.cards.length - 1; i >= 0; i--) {
        selectedDeck.removeCard(i);
      }

      for (let i = 0; i < localDeck.cards.length; i++) {
        selectedDeck.addCard(localDeck.cards[i].card, i);
      }

      console.log("Deck saved!");
    } else {
      console.error("No deck selected or local deck is not set.");
    }
  };

  const cancelChanges = () => {
    if (selectedDeck) {
      setLocalDeck(convertToSortableDeck(selectedDeck));
    }
  };

  useEffect(() => {
    const initializeDecks = async () => {
      const d = await DeckManager.getInstance().getDecks(); 
      setDecks(d);
      if (d.length > 0) {
        setSelectedDeck(d[0]); 
      }
    };

    initializeDecks();
  }, [setSelectedDeck]);

  // useEffect(() => {
  //   const initializeDeck = async () => {
  //     const decks = await DeckManager.getInstance().getDecks();
  //     if (decks.length > 0) {
  //       setSelectedDeck(decks[0]);
  //     }
  //   };
  //   initializeDeck();
  // }, [decks]);

  useEffect(() => {
    if (selectedDeck) {
      setLocalDeck(convertToSortableDeck(selectedDeck));
    }
  }, [selectedDeck, setSelectedDeck]);

  return {
    decks,
    setDecks,
    selectedDeck,
    setSelectedDeck,
    localDeck,
    setLocalDeck,
    saveDeck,
    cancelChanges,
  };
};
