/**
 * @Created 2024-10-07
 * @Brief The inventory component used in the Collection page.
 */

import React, { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import Inventory from "./components/Inventory";
import Decks from "./components/Decks";
import { ISortableDeck } from "interfaces/ISortableDeck";
import NavBar from "components/NavBar";
import "./collection.css";
import { ISortableCard } from "interfaces/ISortableCard";
import SortableCard from "components/SortableCard";
import { useDragAndDrop } from "pages/Collection/hooks/useDragAndDrop";

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
