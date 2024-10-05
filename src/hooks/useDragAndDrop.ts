import { useState } from "react";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { ISortableCard } from "interfaces/ISortableCard";
import { ISortableDeck } from "interfaces/ISortableDeck";
import { v4 as uuidv4 } from "uuid";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Over } from "@dnd-kit/core";



export const useDragAndDrop = (
  selectedCards: ISortableCard[],
  localDeck: ISortableDeck,
  setLocalDeck: (deck: ISortableDeck) => void
) => {
  const [isFromInventory, setIsFromInventory] = useState<boolean>(false);
  const [activeCard, setActiveCard] = useState<ISortableCard | null>(null);
  const [highlightDeck, setHighlightDeck] = useState<boolean>(false);

  const handleDragStart = (event: DragStartEvent) => {
    let draggedCard = selectedCards.find(
      (card) => card.instanceId === event.active.id
    );
    if (draggedCard) {
      setIsFromInventory(true);
    } else {
      setIsFromInventory(false);
      draggedCard = localDeck.cards.find(
        (card) => card.instanceId === event.active.id
      );
    }

    setActiveCard(draggedCard || null); 
  };

  const handleDragEnd = (event: DragEndEvent) => {
  const { over, active } = event;
  setActiveCard(null);

  const activeIndex = findActiveCardIndex(localDeck, active.id);

  if (activeIndex !== -1) {
    processDeckCardDrop(activeIndex, over, localDeck, setLocalDeck);
  } else {
    processInventoryCardDrop(active.id, over, selectedCards, localDeck, setLocalDeck, setHighlightDeck);
  }
};


const findActiveCardIndex = (deck: ISortableDeck, activeId: UniqueIdentifier): number => 
  deck.cards.findIndex((card) => card.instanceId === String(activeId));

const processDeckCardDrop = (
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

const processInventoryCardDrop = (
  activeId: UniqueIdentifier,
  over: Over | null,
  selectedCards: ISortableCard[],
  localDeck: ISortableDeck,
  setLocalDeck: (deck: ISortableDeck) => void,
  setHighlightDeck: (highlight: boolean) => void
) => {
  const draggedCard = findDraggedCard(selectedCards, activeId);
  if (!draggedCard) return;

  const newDraggableCard = createNewDraggableCard(draggedCard);
  const isDirectDrop = over?.id === localDeck.id.toString();

  if (isDirectDrop) {
    addCardDirectlyToDeck(newDraggableCard, localDeck, setLocalDeck, setHighlightDeck);
  } else {
    addCardAtIndex(newDraggableCard, over, localDeck, setLocalDeck, setHighlightDeck);
  }
};


const isDroppedOutsideDeck = (over: Over | null, deck: ISortableDeck): boolean =>
  !over || (over.id !== deck.id.toString() && !deck.cards.some((card) => card.instanceId === over.id));

const removeCardFromDeck = (activeIndex: number, deck: ISortableDeck, setLocalDeck: (deck: ISortableDeck) => void) => {
  const updatedDeck: ISortableDeck = {
    ...deck,
    cards: deck.cards.filter((_, index) => index !== activeIndex),
  };
  setLocalDeck(updatedDeck);
};

const findOverCardIndex = (over: Over | null, deck: ISortableDeck): number =>
  deck.cards.findIndex((card) => card.instanceId === String(over?.id));

const isValidCardMove = (activeIndex: number, overIndex: number): boolean => 
  overIndex !== -1 && activeIndex !== overIndex;

const moveCardWithinDeck = (activeIndex: number, overIndex: number, deck: ISortableDeck, setLocalDeck: (deck: ISortableDeck) => void) => {
  const updatedDeck: ISortableDeck = {
    ...deck,
    cards: arrayMove(deck.cards, activeIndex, overIndex),
  };
  setLocalDeck(updatedDeck);
};


const findDraggedCard = (selectedCards: ISortableCard[], activeId: UniqueIdentifier): ISortableCard | undefined =>
  selectedCards.find((card) => card.instanceId === String(activeId));

const createNewDraggableCard = (draggedCard: ISortableCard): ISortableCard => {
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


  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;

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

  return {
    activeCard,
    isFromInventory,
    highlightDeck,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  };
};
