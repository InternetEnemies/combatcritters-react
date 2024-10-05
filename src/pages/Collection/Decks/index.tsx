import React, { useState, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import "./decks.css";
import SortableCard from "components/SortableCard";
import { ISortableCard } from "interfaces/ISortableCard";
import CreateDeck from "components/CreateDeck";
import DeleteButton from "components/DeleteButton";
import { IDeck } from "combatcritters-ts/src/objects";
import { ISortableDeck } from "interfaces/ISortableDeck";
import DeckManager from "api/DeckManager";
import Dropdown from "components/Dropdown";

interface DeckProps {
  localDeck: ISortableDeck;
  setLocalDeck: (deck: ISortableDeck) => void;
  highlight: boolean;
}

const Decks: React.FC<DeckProps> = ({ localDeck, setLocalDeck, highlight }) => {
  const [deckManager] = useState(DeckManager.getInstance());
  const [decks, setDecks] = useState<IDeck[]>([]); 

  useEffect(() => {
    const fetchDecks = async () => {
      const fetchedDecks = await deckManager.getDecks(); 
      setDecks(fetchedDecks); 
    };
    fetchDecks();
  }, [deckManager]); 

  const { setNodeRef } = useDroppable({
    id: localDeck.id.toString(),
  });

  const style = {
    filter: highlight ? "brightness(1.2)" : "none",
  };

  const handleCreateDeck = (newDeckName: string) => {
    console.log(`Deck "${newDeckName}" has been created.`);
  };

  const handleDeleteDeck = () => {
    console.log(`Deck "${localDeck.name}" has been deleted.`);
  };

  return (
    <div className="decksRoot" style={style}>
      <div className="deckChooserContainer">
        <DeleteButton onDelete={handleDeleteDeck} />
        <CreateDeck onCreateDeck={handleCreateDeck} />
      </div>
      <div className="deckCardsGrid" ref={setNodeRef}>
        {localDeck.cards.map((card) => (
          <SortableCard
            key={card.instanceId}
            sortableCard={card}
            translucent={false}
          />
        ))}
      </div>
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
