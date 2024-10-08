import React, { useState, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import "./decks.css";
import SortableCard from "components/SortableCard";
import CreateDeck from "components/CreateDeck";
import { IDeck } from "combatcritters-ts/src/objects";
import { ISortableDeck } from "interfaces/ISortableDeck";
import DeckManager from "api/DeckManager";
import Button from "components/Button";
import { convertToSortableDeck } from "utils/collectionUtils";
import Dropdown from "components/Dropdown";
import { useDeckSelect } from "hooks/useDeckSelect";
import ConfirmationButton from "components/ConfirmationButton";
import Toast from "components/Toast";
import { useToast } from "hooks/useToast";
import { useMonitorDeckChanges } from "hooks/useMonitorDeckChanges";

interface DeckProps {
  localDeck: ISortableDeck | null;
  setLocalDeck: (deck: ISortableDeck | null) => void;
  highlight: boolean;
}

const Decks: React.FC<DeckProps> = ({ localDeck, setLocalDeck, highlight }) => {
  const [deckManager] = useState(DeckManager.getInstance());
  const { showToast, setShowToast, triggerToast, toastMessage } = useToast();
  const [decks, setDecks] = useState<IDeck[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<IDeck | null>(null);

  const changesMade = useMonitorDeckChanges(localDeck, selectedDeck);


  const saveDeck = async () => {
    if (selectedDeck && localDeck) {
      selectedDeck.cards = []; 

      localDeck.cards.forEach((card, index) => {
        // selectedDeck.cards.push({ ...card.card }); 
        selectedDeck.cards.push(card.card); 
      });

      triggerToast("Deck Saved!");

      setLocalDeck(convertToSortableDeck(selectedDeck)); 
      setSelectedDeck({ ...selectedDeck }); 
    } else {
      console.error("No deck selected or local deck is not set.");
    }
  };

  const cancelChanges = () => {
    if (selectedDeck && changesMade) {
      setLocalDeck(convertToSortableDeck(selectedDeck));
    }
  };
  const { deckDropdownOptions } = useDeckSelect(
    selectedDeck,
    setSelectedDeck,
    setLocalDeck,
    decks,
    changesMade,
    saveDeck
  );

  const { setNodeRef } = useDroppable({
    id: localDeck ? localDeck.id.toString() : "default-droppable",
  });

  const style = {
    filter: highlight ? "brightness(1.2)" : "none",
  };

  const createDeck = async (deckName: string) => {
    try {
      const createdDeck = await deckManager.createDeck(deckName);
      const updatedDecks = await deckManager.getDecks();
      setDecks(updatedDecks);
      setSelectedDeck(createdDeck);
      setLocalDeck(convertToSortableDeck(createdDeck));
      triggerToast("Deck Created!");
    } catch (error) {
      console.error("Error creating the deck:", error);
    }
  };

  const deleteDeck = async () => {
    if (selectedDeck) {
      try {
        await deckManager.deleteDeck(selectedDeck);
        const updatedDecks = await deckManager.getDecks();
        setDecks(updatedDecks);
        if (decks.length > 0) {
          setSelectedDeck(decks[0]);
        } else {
          setSelectedDeck(null);
        }
      } catch (error) {
        console.error("Error deleting the deck:", error);
      }
    }
  };

  return (
    <div className="decksRoot" style={style}>
      <div className="deckChooserContainer">
        <ConfirmationButton
          onClick={deleteDeck}
          confirmationMessage="Are you sure you want to delete this deck?"
          child={<Button onClick={() => {}} text="Delete Deck" />}
        />
        <CreateDeck onCreateDeck={createDeck} />
        <Dropdown
          dropdownOptions={deckDropdownOptions}
          selectedDropdownOption={{
            id: selectedDeck?.deckid ?? 0,
            name: selectedDeck?.name ?? "Select Deck",
          }}
          setSelectedDropdownOption={(option) => {
            const selected = decks.find((deck) => deck.deckid === option.id);
            setSelectedDeck(selected || null);
          }}
        />
      </div>
      <div
        className="deckCardsGrid"
        ref={setNodeRef}
        key={localDeck ? localDeck.id : "no-deck"}
      >
        {localDeck ? (
          localDeck.cards.length === 0 ? (
            <p>No cards in this deck.</p>
          ) : (
            localDeck.cards.map((card) => (
              <SortableCard
                key={card.instanceId}
                sortableCard={card}
                translucent={false}
              />
            ))
          )
        ) : (
          <p>No deck selected.</p>
        )}
      </div>
      {changesMade ? (
        <ConfirmationButton
          onClick={cancelChanges}
          confirmationMessage="Are you sure you want to cancel changes?"
          child={<Button onClick={() => {}} text="Cancel" />}
        />
      ) : (
        <Button text="Cancel" onClick={() => {}} />
      )}
      <Button text={"Save"} onClick={saveDeck} />
      <Toast show={showToast} setShow={setShowToast} message={toastMessage} />
    </div>
  );
};

export default Decks;