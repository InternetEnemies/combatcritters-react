import { useState, useEffect } from "react";
import { IDeck } from "combatcritters-ts/src/objects";
import { IDropdownOption } from "interfaces/IDropdownOption";
import { ISortableDeck } from "interfaces/ISortableDeck";
import { convertToSortableDeck } from "utils/collectionUtils";

export const useDeckSelect = (
  selectedDeck: IDeck | null, // The currently selected deck
  setSelectedDeck: (deck: IDeck) => void, // Function to update the selected deck
  setLocalDeck: (deck: ISortableDeck | null) => void,
  decks: IDeck[],
  changesMade: boolean,
  saveDeck: () => void // The list of all decks
) => {
  const [deckDropdownOptions, setDeckDropdownOptions] = useState<
    IDropdownOption[]
  >([]);
  const [selectedDropdownOption, setSelectedDropdownOption] =
    useState<IDropdownOption | null>(null);

  // Convert decks into dropdown options and set the selected dropdown option
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
  }, [decks, selectedDeck]);

  // Update the selected deck when a new option is selected
  useEffect(() => {
   
    if (selectedDropdownOption) {
      if(changesMade) {
        saveDeck();
      }
      const newSelectedDeck = decks.find(
        (deck) => deck.deckid === selectedDropdownOption.id
      );
      if (newSelectedDeck) {
        setSelectedDeck(newSelectedDeck); // Update the selected deck in the parent
      }
    }
  }, [selectedDropdownOption, decks, setSelectedDeck]);

  useEffect(() => {
    if (selectedDeck) {
      const sortableDeck = convertToSortableDeck(selectedDeck);
      setLocalDeck(sortableDeck);
    } else {
      setLocalDeck(null);
    }
  }, [selectedDeck, setLocalDeck]);

  return {
    deckDropdownOptions, // Options for the dropdown
    selectedDropdownOption, // The selected dropdown option
    setSelectedDropdownOption, // Function to update the dropdown selection
  };
};
