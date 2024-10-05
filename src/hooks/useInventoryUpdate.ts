import { useEffect } from "react";
import { ISortableCard } from "interfaces/ISortableCard";
import { useCardQueryBuilder } from "./useCardQueryBuilder";
import { ISortOption } from "interfaces/ISortOption";
import { IFilterOption } from "interfaces/IFilterOption";

export const useInventoryUpdate = (
  selectedSortOption: ISortOption,
  rarityFilterOptions: IFilterOption[],
  ownedFilter: boolean,
  setSelectedCards: (cards: ISortableCard[]) => void
) => {
  const cardQuery = useCardQueryBuilder(
    selectedSortOption.id,
    rarityFilterOptions.map((filterOption) => filterOption.id),
    ownedFilter
  );

  useEffect(() => {

  }, [cardQuery, setSelectedCards]);
};
