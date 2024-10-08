/**
 * @Created 2024-10-07
 * @Brief Hook to keep track of card filtering.
 */

import { useState } from "react";
import { IFilterOption } from "interfaces/IFilterOption";
import { CardRarity } from "combatcritters-ts";

export const useCardFilter = () => {
  const [rarityFilterOptions, setRarityFilterOptions] = useState<
    IFilterOption[]
  >([
    { name: "Common", id: CardRarity.COMMON, toggled: false },
    { name: "Uncommon", id: CardRarity.UNCOMMON, toggled: false },
    { name: "Rare", id: CardRarity.RARE, toggled: false },
    { name: "Epic", id: CardRarity.EPIC, toggled: false },
    { name: "Legendary", id: CardRarity.LEGENDARY, toggled: false },
  ]);

  const [ownedFilter, setOwnedFilter] = useState<boolean>(true);
  return {
    rarityFilterOptions,
    setRarityFilterOptions,
    ownedFilter,
    setOwnedFilter,
  };
};
