/**
 * @Created 2024-11-25
 * @Brief This is where the cards from the hand are dropped.
 */

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import BattleCardSlot from "pages/Battle/components/BattleCardSlot";
import { ICardState } from "interfaces/ICardState";

interface DroppableSlotProps {
  slotId: string;
  cardState: ICardState | null;
  scale: number;
  isDragging: boolean;
}

const DroppableSlot: React.FC<DroppableSlotProps> = ({
  slotId,
  cardState,
  scale,
  isDragging,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: slotId,
  });

  const style: React.CSSProperties = {
    backgroundColor: isOver ? "red" : isDragging ? "lightgreen" : "transparent",
    transition: "background-color 0.2s ease",
    borderRadius: "8px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <BattleCardSlot
        cardState={cardState}
        scale={scale}
        isPlayerSlot={true}
        isBuffer={true}
      />
    </div>
  );
};

export default DroppableSlot;
