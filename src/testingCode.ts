import { ICard, ICardCritter, ICardItem } from "combatcritters-ts/src/objects";
import { ICardVisitor } from "combatcritters-ts";
import { ISortableDeck } from "interfaces/ISortableDeck";


export function getCritterCards(): ICardCritter[] {
  const cards: ICardCritter[] = [];

  for (let i = 1; i <= 5; i++) {
    cards.push({
      cardid: i,
      rarity: 2,
      name: `UglyMan, the Hideous Hero`,
      playcost: i,
      abilities: [0, 1, 2],
      description: `Uglyman, once shunned for his grotesque appearance, now defends the weak with unmatched strength.`,
      health: 35,
      damage: 10,
      image: "2",
      accept(visitor: ICardVisitor): void {
          visitor.visitCritter(this);
      }
    });
  }

  return cards;
}

export function getItemCards(): ICardItem[] {
  const cards: ICardItem[] = [];

  for (let i = 1; i <= 10; i++) {
    cards.push({
      cardid: i,
      rarity: 2,
      name: `UglyMan, the Hideous Hero`,
      playcost: i,
      description: `Uglyman, once shunned for his grotesque appearance, now defends the weak with unmatched strength.`,
      image: "2",
      abilityid:0,
      accept(visitor: ICardVisitor): void {
        visitor.visitItem(this);
      },
    });
  }

  return cards;
}
