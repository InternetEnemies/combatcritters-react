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
  setSelectedDeck: (deck: IDeck | null) => void, // Allow null for deselect
  setLocalDeck: (deck: ISortableDeck | null) => void,
  decks: IDeck[],
  changesMade: boolean,
  saveDeck: () => void
) => {
  const [deckDropdownOptions, setDeckDropdownOptions] = useState<
    IDropdownOption<IDeck>[]
  >([]);
  const [selectedDropdownOption, setSelectedDropdownOption] =
    useState<IDropdownOption<IDeck> | null>(null);

  // Updates the list of decks in the dropdown whenever decks changes (i.e. a deck is created or deleted).
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const options = decks.map((deck) => ({
      label: deck.name, 
      value: deck, 
    }));
    setDeckDropdownOptions(options);

    if (selectedDeck) {
      const matchingOption = options.find(
        (option) => option.value.deckid === selectedDeck.deckid
      );
      setSelectedDropdownOption(matchingOption || null);
    }
  }, [decks]);

  // Updates the selected deck when the dropdown selection changes.
  useEffect(() => {
    if (selectedDropdownOption) {
      const newSelectedDeck = selectedDropdownOption.value; // Deck is the value
      setSelectedDeck(newSelectedDeck);
    }
  }, [selectedDropdownOption, setSelectedDeck]);

  // Updates localDeck to match the newly selectedDeck
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
