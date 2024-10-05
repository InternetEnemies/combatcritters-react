import { useState } from "react";
import { ISortOption } from "interfaces/ISortOption";
import { CardOrder } from "api/cardOrder";

export const useCardSort = () => {
  const [sortOptions] = useState<ISortOption[]>([
    { name: "Rarity", id: CardOrder.RARITY },
    { name: "Name", id: CardOrder.NAME },
    { name: "Play Cost", id: CardOrder.PLAY_COST },
  ]);

  const [selectedSortOption, setSelectedSortOption] = useState<ISortOption>(
    sortOptions[0]
  );

  
  return {
    sortOptions,
    selectedSortOption,
    setSelectedSortOption,
  };
};
