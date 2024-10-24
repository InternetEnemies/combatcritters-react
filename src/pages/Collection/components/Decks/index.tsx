/**
 * @Created 2024-10-07
 * @Brief The deck component in the Collection page.
 */

import React, { useState, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import "./decks.css";
import SortableCard from "components/SortableCard";
import CreateDeck from "pages/Collection/components/CreateDeck";
import { IDeck } from "combatcritters-ts";
import { ISortableDeck } from "interfaces/ISortableDeck";
import Button from "components/Button";
import { convertToSortableDeck } from "utils/collectionUtils";
import Dropdown from "components/Dropdown";
import { useDeckSelect } from "pages/Collection/hooks/useDeckSelect";
import ConfirmationButton from "components/ConfirmationButton";
import { useMonitorDeckChanges } from "pages/Collection/hooks/useMonitorDeckChanges";
import deleteIcon from "assets/icons/delete.svg";
import { ClientSingleton } from "ClientSingleton";
import "../../collection.css";
import { toast } from "react-toastify";

interface DeckProps {
  localDeck: ISortableDeck | null;
  setLocalDeck: (deck: ISortableDeck | null) => void;
  highlight: boolean;
}

const Decks: React.FC<DeckProps> = ({ localDeck, setLocalDeck, highlight }) => {
  const [deckManager] = useState(ClientSingleton.getInstance().user.decks);
  const [decks, setDecks] = useState<IDeck[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<IDeck | null>(null);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const fetchedDecks = await deckManager.getDecks();
        setDecks(fetchedDecks);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    fetchDecks();
  }, [deckManager]);

  /*
  * On mount, set the selected deck to the first deck in the 
  * user's inventory (if they have a first deck).
  */
  useEffect(() => {
    if (decks.length > 0) {
      setSelectedDeck(decks[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changesMade = useMonitorDeckChanges(localDeck, selectedDeck);

  const { setNodeRef } = useDroppable({
    id: localDeck ? localDeck.id.toString() : "default-droppable",
  });

  const saveDeck = async () => {
    try {
      if (selectedDeck && localDeck) {
        await selectedDeck.setCards(
          localDeck.cards.map((sortableCard) => sortableCard.card)
        );
        await selectedDeck.commit();
        toast.success("Deck Saved!");

        setLocalDeck(await convertToSortableDeck(selectedDeck));
        setSelectedDeck(selectedDeck);
      } else {
        console.error("No deck selected or local deck is not set.");
      }
    } catch (error) {
      console.error("Error saving the deck:", error);
    }
  };

  const cancelChanges = async () => {
    if (selectedDeck && changesMade) {
      setLocalDeck(await convertToSortableDeck(selectedDeck));
    }
  };

  const {
    deckDropdownOptions,
    selectedDropdownOption,
    setSelectedDropdownOption,
  } = useDeckSelect(
    selectedDeck,
    setSelectedDeck,
    setLocalDeck,
    decks,
    changesMade,
    saveDeck
  );

  const createDeck = async (deckName: string) => {
    try {
      await saveDeck();
      const createdDeck = await deckManager.createDeck(deckName);
      const updatedDecks = await deckManager.getDecks();
      setDecks(updatedDecks);
      setSelectedDeck(createdDeck);
      setLocalDeck(await convertToSortableDeck(createdDeck));
      toast.success("Deck Created!");
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

  const style = {
    filter: highlight ? "brightness(1.2)" : "none",
  };

  return (
    <div className="decksInventoryRoot" style={style}>
      <span className="decksInventoryIdentifier">Decks</span>
      <div className="decksInventoryContainer">
        <div className="deckChooserContainer decksInventorySelect">
          <div className="dropdownWrapper">
            <Dropdown
              dropdownOptions={deckDropdownOptions}
              selectedDropdownOption={selectedDropdownOption}
              setSelectedDropdownOption={setSelectedDropdownOption}
              isEmpty={deckDropdownOptions.length === 0}
              isEmptyMessage="No decks available"
            />
          </div>

          <div className="createDeleteContainer">
            <ConfirmationButton
              onClick={deleteDeck}
              confirmationMessage="Are you sure you want to delete this deck?"
              child={
                <img
                  className="trashIcon"
                  src={deleteIcon}
                  alt="Delete Deck"
                  style={{ width: "30px", height: "30px" }}
                />
              }
            />
            <CreateDeck onCreateDeck={createDeck} />
          </div>
        </div>

        <div
          className="deckCardsGrid decksInventoryGrid"
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

        <div className="footerContainer">
          <div className="cancelSaveWrapper">
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
          </div>
        </div>
      </div>

    </div>
  );
};

export default Decks;
