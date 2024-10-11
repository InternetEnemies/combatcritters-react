/**
 * @Created 2024-10-07
 * @Brief Hook to keep track of card sorting.
 */

import { useState } from "react";
import { IDropdownOption } from "interfaces/IDropdownOption";
import { CardOrder } from "combatcritters-ts";

export const useCardSort = () => {
  const [sortOptions] = useState<IDropdownOption<CardOrder>[]>([
    {
      label: "Rarity",
      value: CardOrder.RARITY, 
    },
    {
      label: "Name",
      value: CardOrder.NAME,
    },
    {
      label: "Play Cost",
      value: CardOrder.PLAY_COST,
    },
  ]);

  const [selectedSortOption, setSelectedSortOption] = useState<
    IDropdownOption<CardOrder>
  >(sortOptions[0]);

  return {
    sortOptions,
    selectedSortOption,
    setSelectedSortOption,
  };
};
