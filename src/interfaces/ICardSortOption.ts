/**
 * @Created 2024-10-07
 * @Brief Object that's used in the inventory card sort dropdown.
 */

import { CardOrder } from "combatcritters-ts";

export interface ICardSortOption {
  name: string;
  id: CardOrder;
}
