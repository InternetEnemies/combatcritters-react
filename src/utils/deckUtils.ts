import { IDeck } from "combatcritters-ts/src/objects";
import { ISortableDeck } from "interfaces/ISortableDeck";
import { ISortableCard } from "interfaces/ISortableCard";
import { v4 as uuidv4 } from "uuid"; 

export function convertToSortableDeck(deck: IDeck): ISortableDeck {
  const sortableCards: ISortableCard[] = deck.cards.map((card) => ({
    instanceId: uuidv4(), 
    card: card,
  }));

  const sortableDeck: ISortableDeck = {
    id: deck.deckid,
    name: deck.name,
    cards: sortableCards,
  };

  return sortableDeck;
}
