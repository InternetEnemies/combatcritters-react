import React, { useEffect, useState } from "react";
import { IDeck } from "combatcritters-ts/src/objects";
import { IDropdownOption } from "interfaces/IDropdownOption";

interface DeckDropdownProps {
  decks: IDeck[]; // Array of available decks
  selectedDeck: IDeck | null; // Currently selected deck
  setSelectedDeck: (deck: IDeck) => void; // Callback to update the selected deck
}

const DecksDropdown: React.FC<DeckDropdownProps> = ({
  decks,
  selectedDeck,
  setSelectedDeck,
}) => {
  const [deckDropdownOptions, setDeckDropdownOptions] = useState<
    IDropdownOption[]
  >([]);

  useEffect(() => {
    // Convert decks array to dropdown options
    const options = decks.map((deck) => ({
      id: deck.deckid,
      name: deck.name,
    }));
    setDeckDropdownOptions(options);
  }, [decks]);

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDeckId = Number(e.target.value);
    const selectedDeck = decks.find((deck) => deck.deckid === selectedDeckId);
    if (selectedDeck) {
      setSelectedDeck(selectedDeck); // Notify the parent of the selected deck
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
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DecksDropdown;
