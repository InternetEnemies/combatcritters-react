import React from "react";
import { useDraggable } from "@dnd-kit/core";
import Card from "components/Card";

interface DraggableCardProps {
  id: number;
  rarity: string;
  name: string;
  playCost: number;
  imagePath: string;
  abilities: number[];
  type: string;
  description: string;
  hp: number;
  damage: number;
  cardCount?: number;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  id,
  rarity,
  name,
  playCost,
  imagePath,
  abilities,
  type,
  description,
  hp,
  damage,
  cardCount,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: String(id), 
    });

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 1000 : "auto",
    position: isDragging ? "absolute" : "relative",

  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="draggableCard"
    >
      <Card
        id={id}
        rarity={rarity}
        name={name}
        playCost={playCost}
        imagePath={imagePath}
        abilities={abilities}
        type={type}
        description={description}
        hp={hp}
        damage={damage}
        cardCount={cardCount}
      />
    </div>
  );
};

export default DraggableCard;


