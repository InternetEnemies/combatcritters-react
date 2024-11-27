/**
 * @Created 2024-11-25
 * @Brief Manages the logic related to the hand (including drag and drop).
 */

import { useState } from "react";
import { ICard } from "combatcritters-ts";
import {
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { ICardState } from "interfaces/ICardState";
import { toast } from "react-toastify";

export const useHand = (
  userBufferCards: (ICardState | null)[],
  setUserBufferCards: (cardList: (ICardState | null)[]) => void
) => {
  const [hand, setHand] = useState<ICard[]>([]); 
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  /**
   * On drag start, set the active card id to the dragged card.
   */
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveCardId(active.id.toString());
  };

  /**
   * On drag end, add the card to the buffer cards if the drop area was over a buffer slot
   */
  const handleDragEnd = (event: DragEndEvent) => {
    
    const { active, over } = event;
    const draggedCard = hand[Number(active.id)];
    let newCards = [...userBufferCards];

    if (over) {
      const dropIndex = Number(over.id);
      if (!newCards[dropIndex]) {
        newCards[Number(over.id)] = { card: draggedCard, health: 3 };
        setUserBufferCards(newCards);
      } else {
        toast.error("You have already played a card in this slot");
      }
    }

    setActiveCardId(null);
  };

  return {
    hand,
    setHand,
    activeCardId,
    handleDragStart,
    handleDragEnd,
  };
};
