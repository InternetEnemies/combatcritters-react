import { getCards } from "testingCode";
import React, { useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import DraggableCard from "components/DraggableCard";
import "./inventory.css";
import {Card} from "card"

interface InventoryProps {
  selectedCards: Card[];
  setSelectedCards: (cards: Card[]) => void;
}

const Inventory: React.FC<InventoryProps> = ({
  selectedCards,
  setSelectedCards,
}) => {
  useEffect(() => {
    const cards = getCards(); 
    setSelectedCards(cards);
  }, [setSelectedCards]);

  return (
    <div className="inventoryRoot">
      <div className="cardGrid">
        {selectedCards.map((card) => (
          <DraggableCard
            key={card.id}
            id={card.id}
            rarity={card.rarity}
            name={card.name}
            playCost={card.playCost}
            imagePath={card.imagePath}
            abilities={card.abilities}
            type={card.type}
            description={card.description}
            hp={card.hp}
            damage={card.damage}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;


