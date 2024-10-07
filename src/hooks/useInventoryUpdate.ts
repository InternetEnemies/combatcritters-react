import { useEffect } from "react";
import { ISortableCard } from "interfaces/ISortableCard";
import { useCardQueryBuilder } from "./useCardQueryBuilder";
import { IFilterOption } from "interfaces/IFilterOption";
import { ICardSortOption } from "interfaces/ICardSortOption";
import { ICardQueryBuilder } from "combatcritters-ts";

export const useInventoryUpdate = (
  cardQueryBuilder: ICardQueryBuilder,
  selectedSortOption: ICardSortOption,
  rarityFilterOptions: IFilterOption[],
  ownedFilter: boolean,
  setSelectedCards: (cards: ISortableCard[]) => void
) => {
  const cardQuery = useCardQueryBuilder(
    cardQueryBuilder,
    selectedSortOption.id,
    rarityFilterOptions.map((filterOption) => filterOption.id),
    ownedFilter
  );

  useEffect(() => {

  }, [cardQuery, setSelectedCards]);
};
