/**
 * @Created 2024-11-25
 * @Brief The draggable card used in Hand.
 */

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { ICard } from "combatcritters-ts";
import Card from "components/Card";

interface HandCardProps {
  card: ICard;
  scale: number;
  dragId: string;
}

const HandCard: React.FC<HandCardProps> = ({ card, scale, dragId }) => {
  const { attributes, listeners, setNodeRef } =
    useDraggable({
      id: dragId,
    });

  return (
    <div ref={setNodeRef}   {...listeners} {...attributes}>
      <Card card={card} scale={scale} />
    </div>
  );
};

export default HandCard;
