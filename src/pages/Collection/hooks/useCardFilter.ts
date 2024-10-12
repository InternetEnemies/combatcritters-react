/**
 * @Created 2024-10-07
 * @Brief Hook to keep track of card filtering.
 */

import { useState } from "react";
import { IFilterOption } from "interfaces/IFilterOption";
import { CardRarity } from "combatcritters-ts";

export const useCardFilter = () => {
  const [rarityFilterOptions, setRarityFilterOptions] = useState<
    IFilterOption<CardRarity>[]
  >([
    { label: "Common", value: CardRarity.COMMON, toggled: false },
    { label: "Uncommon", value: CardRarity.UNCOMMON, toggled: false },
    { label: "Rare", value: CardRarity.RARE, toggled: false },
    { label: "Epic", value: CardRarity.EPIC, toggled: false },
    { label: "Legendary", value: CardRarity.LEGENDARY, toggled: false },
  ]);

  const [ownedFilter, setOwnedFilter] = useState<boolean>(true);
  return {
    rarityFilterOptions,
    setRarityFilterOptions,
    ownedFilter,
    setOwnedFilter,
  };
};
