import { v4 as uuidv4 } from "uuid"; 
import { ICard } from "combatcritters-ts/src/objects";
import { ISortableCard } from "interfaces/ISortableCard"; 

export const convertToSortable = (cards: ICard[]): ISortableCard[] => {
  return cards.map((card) => ({
    instanceId: uuidv4(), 
    card, 
    cardCount:2
  }));
};
