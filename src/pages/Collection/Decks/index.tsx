import React, { useState, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import "./decks.css";
import SortableCard from "components/SortableCard";
import CreateDeck from "components/CreateDeck";
import DeleteButton from "components/DeleteButton";
import { IDeck } from "combatcritters-ts/src/objects";
import { ISortableDeck } from "interfaces/ISortableDeck";
import DeckManager from "api/DeckManager";
import Button from "components/Button";
import { useDeckSave } from "hooks/useDeckSave";
import { convertToSortableDeck } from "utils/deckUtils";
import { useDeckCreateDelete } from "hooks/useDeckCreateDelete";
import Dropdown from "components/Dropdown";
import { useDeckSelect } from "hooks/useDeckSelect"; // Import your hook
import ConfirmationButton from "components/ConfirmationButton";
import Toast from "components/Toast";
import { useToast } from "hooks/useToast";

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

  const { saveDeck, cancelChanges, changesMade } = useDeckSave(
    localDeck,
    setLocalDeck,
    selectedDeck,
    triggerToast
  );

  // Use the useDeckSelect hook
  const { deckDropdownOptions } = useDeckSelect(
    selectedDeck,
    setSelectedDeck,
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

  useEffect(() => {
    if (selectedDeck) {
      const sortableDeck = convertToSortableDeck(selectedDeck);
      setLocalDeck(sortableDeck);
    } else {
      setLocalDeck(null);
    }
  }, [selectedDeck, setLocalDeck]);

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

// import React, { useState, useEffect } from "react";
// import { useDroppable } from "@dnd-kit/core";
// import "./decks.css";
// import SortableCard from "components/SortableCard";
// import { ISortableCard } from "interfaces/ISortableCard";
// import CreateDeck from "components/CreateDeck";
// import DeleteButton from "components/DeleteButton";
// import { IDeck } from "combatcritters-ts/src/objects";
// import { ISortableDeck } from "interfaces/ISortableDeck";
// import DeckManager from "api/DeckManager";
// import Dropdown from "components/Dropdown";

// interface DeckProps {
//   localDeck: ISortableDeck | null;
//   setLocalDeck: (deck: ISortableDeck) => void;
//   selectedDeck: IDeck | null;
//   setSelectedDeck: (deck: IDeck) => void;
//   highlight: boolean;
// }

// const Decks: React.FC<DeckProps> = ({ localDeck, setLocalDeck, highlight }) => {
//   const [deckManager] = useState(DeckManager.getInstance());
//   const [decks, setDecks] = useState<IDeck[]>([]);

//   useEffect(() => {
//     const fetchDecks = async () => {
//       const fetchedDecks = await deckManager.getDecks();
//       setDecks(fetchedDecks);
//     };
//     fetchDecks();
//   }, [deckManager]);

//   const { setNodeRef } = useDroppable({
//     id: localDeck.id.toString(),
//   });

//   const style = {
//     filter: highlight ? "brightness(1.2)" : "none",
//   };

//   const handleCreateDeck = (newDeckName: string) => {
//     console.log(`Deck "${newDeckName}" has been created.`);
//   };

//   const handleDeleteDeck = () => {
//     console.log(`Deck "${localDeck.name}" has been deleted.`);
//   };

//   return (
//     <div className="decksRoot" style={style}>
//       <div className="deckChooserContainer">
//         <DeleteButton onDelete={handleDeleteDeck} />
//         <CreateDeck onCreateDeck={handleCreateDeck} />
//       </div>
//       <div className="deckCardsGrid" ref={setNodeRef}>
//         {localDeck.cards.map((card) => (
//           <SortableCard
//             key={card.instanceId}
//             sortableCard={card}
//             translucent={false}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Decks;

// import React, { useState, useEffect } from "react";
// import { useDroppable } from "@dnd-kit/core";
// import "./decks.css";
// import SortableCard from "components/SortableCard";
// import { ISortableCard } from "interfaces/ISortableCard";
// import CreateDeck from "components/CreateDeck";
// import DeleteButton from "components/DeleteButton";
// import { IDeck } from "combatcritters-ts/src/objects";
// import { ISortableDeck } from "interfaces/ISortableDeck";
// import DeckManager from "api/DeckManager";
// import Dropdown from "components/Dropdown";

// interface DeckProps {
//   localDeck: IDeck;
//   setLocalDeck: (deck: IDeck) => void;
//   highlight: boolean;
// }

// const Decks: React.FC<DeckProps> = ({ localDeck, setLocalDeck, highlight }) => {
//   const [deckManager] = useState(DeckManager.getInstance()); // Extract the instance directly
//   const [decks, setDecks] = useState<IDeck[]>([]); // Manage the decks state

//   useEffect(() => {
//     const fetchDecks = async () => {
//       const fetchedDecks = await deckManager.getDecks(); // Fetch the decks
//       setDecks(fetchedDecks); // Set the decks in state
//     };
//     fetchDecks();
//   }, [deckManager]);

//   const { setNodeRef } = useDroppable({
//     id: localDeck.deckid.toString(),
//   });

//   const style = {
//     filter: highlight ? "brightness(1.2)" : "none",
//   };

//   const handleCreateDeck = (newDeckName: string) => {
//     console.log(`Deck "${newDeckName}" has been created.`);
//   };

//   const handleDeleteDeck = () => {
//     console.log(`Deck "${localDeck.name}" has been deleted.`);
//   };

//   return (
//     <div className="decksRoot" style={style}>
//       <div className="deckChooserContainer">
//         <DeleteButton onDelete={handleDeleteDeck} />
//         <CreateDeck onCreateDeck={handleCreateDeck} />

//       </div>
//       <div className="deckCardsGrid" ref={setNodeRef}>
//         {localDeck.cards.map((card) => (
//           <SortableCard
//             key={card.instanceId}
//             sortableCard={card}
//             translucent={false}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Decks;
