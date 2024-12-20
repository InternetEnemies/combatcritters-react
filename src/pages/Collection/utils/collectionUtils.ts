/**
 * @Created 2024-10-07
 * @Brief Utilities used in the collection page.
 */

import { v4 as uuidv4 } from "uuid";
import { ICard } from "combatcritters-ts";
import { ISortableCard } from "interfaces/ISortableCard";
import { ISortableDeck } from "interfaces/ISortableDeck";
import { IDeck } from "combatcritters-ts";
import { IItemStack } from "combatcritters-ts";

export const convertCardStackToSortable = (
  cardStacks: IItemStack<ICard>[]
): ISortableCard[] => {
  return cardStacks.map((cardStack) => ({
    instanceId: uuidv4(),
    card: cardStack.getItem(),
    cardCount: cardStack.getAmount(),
  }));
};

export async function convertToSortableDeck(
  deck: IDeck
): Promise<ISortableDeck> {
  try {
    const deckCards = await deck.getCards();
    const sortableCards: ISortableCard[] = deckCards.map((card) => ({
      instanceId: uuidv4(),
      card: card,
    }));

    const sortableDeck: ISortableDeck = {
      id: deck.deckid,
      name: deck.name,
      cards: sortableCards,
    };

    return sortableDeck;
  } catch (e) {
    throw e;
  }
}
