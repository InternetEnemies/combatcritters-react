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
import { ICardState } from "combatcritters-ts";
import { toast } from "react-toastify";
import { useBattleClient } from "contexts/BattleClientContext";

export const useHand = (
  userBufferCards: (ICardState | null)[],
  setUserBufferCards: (cardList: (ICardState | null)[]) => void,
  hand: ICard[],
  setHand: (hand: ICard[]) => void,
  drawPileSize: number,
  setDrawPileSize: (size: number) => void
) => {
  const {battleClient} = useBattleClient();
  // const [hand, setHand] = useState<ICard[]>([]); 
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  // const [drawPileSize, setDrawPileSize] = useState<number>(0);

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
      battleClient?.battleController.playCard(draggedCard, dropIndex);
    }

    setActiveCardId(null);
  };

  return {
    // hand,
    // setHand,
    activeCardId,
    handleDragStart,
    handleDragEnd,
    // drawPileSize,
    // setDrawPileSize
  };
};
