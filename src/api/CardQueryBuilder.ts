import { CardOrder } from "./cardOrder";
import { CardRarity } from "./cardRarity";
import { ICardQuery } from "./cardQuery";
import { ICardQueryBuilder } from "./ICardQueryBuilder";

class CardQueryBuilder implements ICardQueryBuilder {
  private costGreater: number | null = null;
  private costLess: number | null = null;
  private ids: number[] = [];
  private order: CardOrder | null = null;
  private owned: boolean | null = null;
  private rarityInclude: CardRarity | null = null;
  private rarityExclude: CardRarity | null = null;

  setCostGreater(cost: number): void {
    this.costGreater = cost;
  }

  setRarities(limits: number[]): void {}

  setInclude(isInclude: boolean): void {

  }

  setCostLess(cost: number): void {
  }

  setIds(ids: number[]): void {
  }

  setOrder(order: CardOrder): void {
  }

  setOwned(owned: boolean): void {
  }

  setRarityInclude(limit: CardRarity): void {
  }

  setRarityExclude(limit: CardRarity): void {
  }

  build(): ICardQuery {
    return {
      costGreater: 0,
      costLess: 0,
      ids: [0],
      order: CardOrder.ID,
      owned: "true",
      rarityInclude: "y",
      rarityExclude: "x",
    };
  }

  reset(): void {
   
  }
}

export default CardQueryBuilder;
