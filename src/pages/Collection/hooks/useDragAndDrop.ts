/**
 * @Created 2024-10-07
 * @Brief Hook for the drag and drop logic in the Collection page.
 * 
 * This class scares me...
 */

import { useState } from "react";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { ISortableCard } from "interfaces/ISortableCard";
import { ISortableDeck } from "interfaces/ISortableDeck";
import { v4 as uuidv4 } from "uuid";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Over } from "@dnd-kit/core";

export const useDragAndDrop = (
/*
*   Note: handleDragStart(), handleDragEnd(), and handleDragOver are the main functions. Everything else
*         is a helper function for them.
*/


  selectedCards: ISortableCard[],
  localDeck: ISortableDeck | null,
  setLocalDeck: (deck: ISortableDeck) => void
) => {
  const [isFromInventory, setIsFromInventory] = useState<boolean>(false); //If the card being dragged is from the inventory.
  const [activeCard, setActiveCard] = useState<ISortableCard | null>(null); //SortableCard being dragged.
  const [highlightDeck, setHighlightDeck] = useState<boolean>(false);

  /**
   * Handles when a drag starts. Determines if the dragged card is from inventory
   * or already in the deck and sets the active card.
   */
  const handleDragStart = (event: DragStartEvent) => {
    let draggedCard = selectedCards.find(
      (card) => card.instanceId === event.active.id
    );

    if (draggedCard) {
      setIsFromInventory(true);
    } else {
      setIsFromInventory(false);

      if (localDeck) {
        draggedCard = localDeck.cards.find(
          (card) => card.instanceId === event.active.id
        );
      }
    }

    setActiveCard(draggedCard || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setActiveCard(null);

    if (!localDeck) return; //No deck selected.

    const activeIndex = findActiveCardIndex(localDeck, active.id);

    if (activeIndex !== -1) {
      //Dragged card is from the deck.
      handleDeckCardDrop(activeIndex, over, localDeck, setLocalDeck);
    } else {
      //Dragged card is from the inventory.
      handleInventoryCardDrop(
        active.id,
        over,
        selectedCards,
        localDeck,
        setLocalDeck,
        setHighlightDeck
      );
    }
  };

  /**
   * Highlight the deck when the card is dragged over it.
   */
  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;

    if (!localDeck) {
      setHighlightDeck(false);
      return;
    }

    if (isFromInventory && over) {
      const isOverDeckCard = localDeck.cards.some(
        (card) => card.instanceId === over.id
      );

      if (over.id === localDeck.id.toString() || isOverDeckCard) {
        setHighlightDeck(true);
      } else {
        setHighlightDeck(false);
      }
    } else {
      setHighlightDeck(false);
    }
  };

  // Finds the index of the active card in the deck.
  const findActiveCardIndex = (
    deck: ISortableDeck,
    activeId: UniqueIdentifier
  ): number =>
    deck.cards.findIndex((card) => card.instanceId === String(activeId));

  /**
   * Handles the logic for adding and removing cards from deck.
   */
  const handleDeckCardDrop = (
    activeIndex: number,
    over: Over | null,
    localDeck: ISortableDeck,
    setLocalDeck: (deck: ISortableDeck) => void
  ) => {
    const droppedOutside = isDroppedOutsideDeck(over, localDeck);
    if (droppedOutside) {
      removeCardFromDeck(activeIndex, localDeck, setLocalDeck);
    } else {
      const overIndex = findOverCardIndex(over, localDeck);
      if (isValidCardMove(activeIndex, overIndex)) {
        moveCardWithinDeck(activeIndex, overIndex, localDeck, setLocalDeck);
      }
    }
  };

  /**
   * Handles the logic for dropping a card from inventory into the deck.
   */
  const handleInventoryCardDrop = (
    activeId: UniqueIdentifier,
    over: Over | null,
    selectedCards: ISortableCard[],
    localDeck: ISortableDeck | null,
    setLocalDeck: (deck: ISortableDeck) => void,
    setHighlightDeck: (highlight: boolean) => void
  ) => {
    const draggedCard = findDraggedCard(selectedCards, activeId);
    if (!draggedCard || !localDeck) return;

    const newDraggableCard = createNewDraggableCard(draggedCard);
    const isDirectDrop = over?.id === localDeck.id.toString();

    if (isDirectDrop) {
      addCardDirectlyToDeck(
        newDraggableCard,
        localDeck,
        setLocalDeck,
        setHighlightDeck
      );
    } else {
      addCardAtIndex(
        newDraggableCard,
        over,
        localDeck,
        setLocalDeck,
        setHighlightDeck
      );
    }
  };

  /**
   * Checks if the card was dropped outside the deck.
   */
  const isDroppedOutsideDeck = (
    over: Over | null,
    deck: ISortableDeck
  ): boolean =>
    !over ||
    (over.id !== deck.id.toString() &&
      !deck.cards.some((card) => card.instanceId === over.id));

  const removeCardFromDeck = (
    activeIndex: number,
    deck: ISortableDeck,
    setLocalDeck: (deck: ISortableDeck) => void
  ) => {
    const updatedDeck: ISortableDeck = {
      ...deck,
      cards: deck.cards.filter((_, index) => index !== activeIndex),
    };
    setLocalDeck(updatedDeck);
  };

  /**
   * Finds the index of the card that the dragged card is hovering over.
   */
  const findOverCardIndex = (over: Over | null, deck: ISortableDeck): number =>
    deck.cards.findIndex((card) => card.instanceId === String(over?.id));

  /**
   * Checks if the card can be moved within the deck (not the same index).
   */
  const isValidCardMove = (activeIndex: number, overIndex: number): boolean =>
    overIndex !== -1 && activeIndex !== overIndex;

  /**
   * Moves the card to a new position within the deck.
   */
  const moveCardWithinDeck = (
    activeIndex: number,
    overIndex: number,
    deck: ISortableDeck,
    setLocalDeck: (deck: ISortableDeck) => void
  ) => {
    const updatedDeck: ISortableDeck = {
      ...deck,
      cards: arrayMove(deck.cards, activeIndex, overIndex),
    };
    setLocalDeck(updatedDeck);
  };

  /**
   * Finds the card being dragged from the inventory.
   */
  const findDraggedCard = (
    selectedCards: ISortableCard[],
    activeId: UniqueIdentifier
  ): ISortableCard | undefined =>
    selectedCards.find((card) => card.instanceId === String(activeId));

  const createNewDraggableCard = (
    draggedCard: ISortableCard
  ): ISortableCard => {
    const { cardCount, ...cardWithoutCount } = draggedCard;
    return {
      ...cardWithoutCount,
      instanceId: uuidv4(),
    };
  };

  const addCardDirectlyToDeck = (
    newDraggableCard: ISortableCard,
    localDeck: ISortableDeck,
    setLocalDeck: (deck: ISortableDeck) => void,
    setHighlightDeck: (highlight: boolean) => void
  ) => {
    const updatedDeck: ISortableDeck = {
      ...localDeck,
      cards: [...localDeck.cards, newDraggableCard],
    };
    setLocalDeck(updatedDeck);
    setHighlightDeck(false);
  };

  /**
   * Adds the card at a specific index in the deck.
   */
  const addCardAtIndex = (
    newDraggableCard: ISortableCard,
    over: Over | null,
    localDeck: ISortableDeck,
    setLocalDeck: (deck: ISortableDeck) => void,
    setHighlightDeck: (highlight: boolean) => void
  ) => {
    const overIndex = findOverCardIndex(over, localDeck);
    if (overIndex !== -1) {
      const updatedCards = [...localDeck.cards];
      updatedCards.splice(overIndex, 0, newDraggableCard);

      const updatedDeck: ISortableDeck = {
        ...localDeck,
        cards: updatedCards,
      };
      setLocalDeck(updatedDeck);
      setHighlightDeck(false);
    }
  };

  return {
    activeCard,
    isFromInventory,
    highlightDeck,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  };
};
