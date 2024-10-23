/**
 * @Created 2024-10-07
 * @Brief Object with unique ID to be used with drag and drop.
 */

import { ICard } from "combatcritters-ts";

export interface ISortableCard {
  instanceId: string;
  card: ICard;
  cardCount?: number;
}
