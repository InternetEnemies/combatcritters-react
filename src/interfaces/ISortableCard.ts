import { ICard } from "combatcritters-ts/src/objects";

export interface ISortableCard {
  instanceId: string;
  card: ICard;
  cardCount?: number;
}
