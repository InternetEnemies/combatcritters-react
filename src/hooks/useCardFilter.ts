import { useState } from "react";
import { ISortOption } from "interfaces/ISortOption";
import { CardOrder } from "api/cardOrder";
import { IFilterOption } from "interfaces/IFilterOption";
import { CardRarity } from "api/cardRarity";

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
