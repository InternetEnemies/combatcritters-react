/**
 * @Created 2024-10-07
 * @Brief Hook used to build card queries.
 */

import { CardOrder } from "combatcritters-ts";
import { ICardQueryBuilder } from "combatcritters-ts";
import { ICardQuery } from "combatcritters-ts";
import { useState } from "react";

import { useEffect } from "react";
export const useCardQueryBuilder = (
  cardQueryBuilder: ICardQueryBuilder,
  sortOption: CardOrder,
  rarityFilterOptions: number[],
  owned: boolean
) => {
  const [cardQuery, setCardQuery] = useState<ICardQuery>();

  useEffect(() => {
    cardQueryBuilder.reset();
    cardQueryBuilder.setRaritiesInclude(true);
    cardQueryBuilder.setOrder(sortOption);
    cardQueryBuilder.setOwned(owned);
    cardQueryBuilder.setRarities(rarityFilterOptions);
    setCardQuery(cardQueryBuilder.build());
  }, [sortOption, owned, rarityFilterOptions]);

  return cardQuery;
};
