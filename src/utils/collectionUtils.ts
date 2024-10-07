import { v4 as uuidv4 } from "uuid";
import { ICard } from "combatcritters-ts/src/objects";
import { ISortableCard } from "interfaces/ISortableCard";
import { ISortableDeck } from "interfaces/ISortableDeck";
import { IDeck } from "combatcritters-ts/src/objects";
import { IItemStack } from "combatcritters-ts/src/objects";

export const convertToSortable = (cards: ICard[]): ISortableCard[] => {
  return cards.map((card) => ({
    instanceId: uuidv4(),
    card,
    cardCount: 2,
  }));
};

export const convertCardStackToSortable = (
  cardStacks: IItemStack<ICard>[]
): ISortableCard[] => {
  return cardStacks.map((cardStack) => ({
    instanceId: uuidv4(),
    card: cardStack.getItem(),
    cardCount: cardStack.getAmount(),
  }));
};



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