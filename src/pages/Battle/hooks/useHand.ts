/**
 * @Created 2024-11-25
 * @Brief Manages the logic related to the hand (including drag and drop).
 */

import { useEffect, useState } from "react";
import { ICard } from "combatcritters-ts";
import { ClientSingleton } from "ClientSingleton";
import {
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { ICardState } from "interfaces/ICardState";
import { toast } from "react-toastify";

export const useHand = (
  userBufferCards: (ICardState | null)[],
  setUserBufferCards: (cardList: (ICardState | null)[]) => void
) => {
  const [hand, setHand] = useState<ICard[]>([]); 
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  useEffect(() => {
    const setHandCards = async () => {
      const builder =
        await ClientSingleton.getInstance().user.cards.getBuilder();
      const cards = await ClientSingleton.getInstance().user.cards.getCards(
        builder.build()
      );
      setHand([
        cards[0].getItem(),
        cards[0].getItem(),
        cards[0].getItem(),
        cards[1].getItem(),
        cards[0].getItem(),
        cards[0].getItem(),
        cards[0].getItem(),
        cards[1].getItem(),
      ]);
    };
    setHandCards();
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveCardId(active.id.toString());
  };

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

      console.log(draggedCard);
    }

    setActiveCardId(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;

    if (over) {
      console.log(`Dragging over: ${over.id}`);
    }
  };

  return {
    hand,
    setHand,
    activeCardId,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  };
};
