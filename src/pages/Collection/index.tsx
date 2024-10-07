import React, { useState, useEffect } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import Inventory from "./Inventory";
import Decks from "./Decks";
import { ISortableDeck } from "interfaces/ISortableDeck";
import NavBar from "components/NavBar";
import "./collection.css";
import { ISortableCard } from "interfaces/ISortableCard";
import SortableCard from "components/SortableCard";
import { useDragAndDrop } from "hooks/useDragAndDrop";
import DeckManager from "api/DeckManager";
import { convertToSortableDeck } from "utils/collectionUtils";
import { IDeck } from "combatcritters-ts/src/objects";
import { useDeckManage } from "hooks/useDeckManage";
const Collection: React.FC = () => {
  const [selectedCards, setSelectedCards] = useState<ISortableCard[]>([]);
  const [localDeck, setLocalDeck] = useState<ISortableDeck | null>(null);

  const {
    activeCard,
    highlightDeck,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  } = useDragAndDrop(selectedCards, localDeck, setLocalDeck);

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragOver}
    >
      <div className="collectionRoot">
        <NavBar />
        <div className="invDecksContainer">
          <SortableContext
            items={
              localDeck ? localDeck.cards.map((card) => card.instanceId) : []
            }
          >
            <Decks
              localDeck={localDeck}
              setLocalDeck={setLocalDeck}
              highlight={highlightDeck}
            />
          </SortableContext>

          <Inventory
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
          />
        </div>

        <DragOverlay>
          {activeCard ? (
            <SortableCard sortableCard={activeCard} translucent={true} />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default Collection;
