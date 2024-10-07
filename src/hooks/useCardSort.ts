import { useState } from "react";
import { ICardSortOption } from "interfaces/ICardSortOption";
import { CardOrder } from "combatcritters-ts";


export const useCardSort = () => {
  const [sortOptions] = useState<ICardSortOption[]>([
    { name: "Rarity", id: CardOrder.RARITY },
    { name: "Name", id: CardOrder.NAME },
    { name: "Play Cost", id: CardOrder.PLAY_COST },
  ]);

  const [selectedSortOption, setSelectedSortOption] = useState<ICardSortOption>(
    sortOptions[0]
  );

  
  return {
    sortOptions,
    selectedSortOption,
    setSelectedSortOption,
  };
};
