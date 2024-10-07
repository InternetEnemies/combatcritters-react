import { useMemo } from "react";
import { CardQueryBuilder } from "combatcritters-ts";
import { CardOrder } from "combatcritters-ts";
import { ICardQueryBuilder } from "combatcritters-ts";

export const useCardQueryBuilder = (
  cardQueryBuilder: ICardQueryBuilder,
  sortOption: CardOrder | null,
  rarityFilterOptions: number[] | null,
  owned: boolean
) => {

  return useMemo(() => {
    if (sortOption) {
      cardQueryBuilder.setOrder(sortOption);
    }
    if(owned) {
      cardQueryBuilder.setOwned();
    }
    if (rarityFilterOptions) {
      cardQueryBuilder.setRarities(rarityFilterOptions);
    }
    // Rebuild only when dependencies change
    return cardQueryBuilder.build();
  }, [sortOption, rarityFilterOptions, owned, cardQueryBuilder]);
};
