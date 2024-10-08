/**
 * @Created 2024-10-07
 * @Brief Object to allow drag and drop within the deck.
 */

import { ISortableCard } from "interfaces/ISortableCard";

export interface ISortableDeck {
  id: number;
  name: string;
  cards: ISortableCard[];
}
