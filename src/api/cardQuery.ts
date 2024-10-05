import { CardOrder } from "./cardOrder";

export interface ICardQuery {
  costGreater: number;
  costLess: number;
  ids: number[];
  order: CardOrder;
  owned: string;
  rarityExclude: string;
  rarityInclude: string;
}
