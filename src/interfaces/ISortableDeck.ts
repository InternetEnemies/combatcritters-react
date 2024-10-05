import { ISortableCard } from "interfaces/ISortableCard";

export interface ISortableDeck {
  id: number;
  name: string;
  cards: ISortableCard[];
}
