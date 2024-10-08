/**
 * @Created 2024-10-07
 * @Brief Hook that manages the logic for switching decks in the deckbuilder.
 */

import { useState, useEffect } from "react";
import { IDeck } from "combatcritters-ts/src/objects";
import { IDropdownOption } from "interfaces/IDropdownOption";
import { ISortableDeck } from "interfaces/ISortableDeck";
import { convertToSortableDeck } from "utils/collectionUtils";

export const useDeckSelect = (
  selectedDeck: IDeck | null,
  setSelectedDeck: (deck: IDeck) => void,
  setLocalDeck: (deck: ISortableDeck | null) => void,
  decks: IDeck[],
  changesMade: boolean,
  saveDeck: () => void
) => {
  const [deckDropdownOptions, setDeckDropdownOptions] = useState<
    IDropdownOption[]
  >([]);
  const [selectedDropdownOption, setSelectedDropdownOption] =
    useState<IDropdownOption | null>(null);

  //Updates the list of decks in the dropdown whenever decks changes (i.e. a deck is created or deleted).
  useEffect(() => {
    const options = decks.map((deck) => ({
      id: deck.deckid,
      name: deck.name,
    }));
    setDeckDropdownOptions(options);

    if (selectedDeck) {
      const matchingOption = options.find(
        (option) => option.id === selectedDeck.deckid
      );
      setSelectedDropdownOption(matchingOption || null);
    }
  }, [decks]);

  //Updates the selected deck when the dropdown selection changes.
  useEffect(() => {
    if (selectedDropdownOption) {
      const newSelectedDeck = decks.find(
        (deck) => deck.deckid === selectedDropdownOption.id
      );
      if (newSelectedDeck) {
        setSelectedDeck(newSelectedDeck);
      }
    }
  }, [selectedDropdownOption, setSelectedDeck, decks]);

  //Updates localdeck to match the newly selectedDeck
  useEffect(() => {
    const fetchAndSetDeck = async () => {
      if (selectedDeck) {
        const sortableDeck = await convertToSortableDeck(selectedDeck);
        setLocalDeck(sortableDeck);
      } else {
        setLocalDeck(null);
      }
    };

    fetchAndSetDeck();
  }, [selectedDeck, setLocalDeck]);

  return {
    deckDropdownOptions,
    selectedDropdownOption,
    setSelectedDropdownOption,
  };
};
