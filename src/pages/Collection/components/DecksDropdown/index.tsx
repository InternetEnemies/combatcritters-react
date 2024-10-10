/**
 * @Created 2024-10-07
 * @Brief Dropdown of decks used in the deck builder.
 */

import React, { useEffect, useState } from "react";
import { IDeck } from "combatcritters-ts/src/objects";
import { IDropdownOption } from "interfaces/IDropdownOption";

interface DeckDropdownProps {
  decks: IDeck[];
  selectedDeck: IDeck | null;
  setSelectedDeck: (deck: IDeck) => void;
}

const DecksDropdown: React.FC<DeckDropdownProps> = ({
  decks,
  selectedDeck,
  setSelectedDeck,
}) => {
  const [deckDropdownOptions, setDeckDropdownOptions] = useState<
    IDropdownOption<IDeck>[]
  >([]);

  // Convert decks[] into IDropdownOption[]
  useEffect(() => {
    const options = decks.map((deck) => ({
      label: deck.name, 
      value: deck, 
    }));
    setDeckDropdownOptions(options);
  }, [decks]);

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDeckId = Number(e.target.value);
    const selectedDeck = decks.find((deck) => deck.deckid === selectedDeckId);
    if (selectedDeck) {
      setSelectedDeck(selectedDeck);
    }
  };

  return (
    <div className="deckDropdown">
      <select
        value={selectedDeck ? selectedDeck.deckid : ""}
        onChange={handleDropdownChange}
      >
        <option value="" disabled>
          Select a deck
        </option>
        {deckDropdownOptions.map((option) => (
          <option key={option.value.deckid} value={option.value.deckid}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DecksDropdown;
