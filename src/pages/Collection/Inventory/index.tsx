import React, { useEffect, useState } from "react";
import "./inventory.css";
import { ISortableCard } from "interfaces/ISortableCard";
import SortableCard from "components/SortableCard";
import { getItemCards, getCritterCards } from "testingCode";
import { convertToSortable } from "utils/cardUtils";
import SortDropdown from "components/Dropdown";
import Filter from "components/Filter";
import { CardRarity } from "api/cardRarity";
import { IFilterOption } from "interfaces/IFilterOption";
import { ISortOption } from "interfaces/ISortOption";
import { CardOrder } from "api/cardOrder";
import Switch from "components/Switch";
import { useCardSort } from "hooks/useCardSort";
import { useCardFilter } from "hooks/useCardFilter";

interface InventoryProps {
  selectedCards: ISortableCard[];
  setSelectedCards: (cards: ISortableCard[]) => void;
}

const Inventory: React.FC<InventoryProps> = ({
  selectedCards,
  setSelectedCards,
}) => {
  const { sortOptions, selectedSortOption, setSelectedSortOption } =
    useCardSort();

  const {
    rarityFilterOptions,
    setRarityFilterOptions,
    ownedFilter,
    setOwnedFilter,
  } = useCardFilter();

  useEffect(() => {
    setSelectedCards(convertToSortable(getCritterCards())); 
  }, [setSelectedCards]);

  return (
    <div className="inventoryRoot">
      <div className="filterSortContainer">
        <SortDropdown
          dropdownOptions={sortOptions}
          selectedDropdownOption={selectedSortOption}
          setSelectedDropdownOption={setSelectedSortOption}
          className="inventorySort"
          labelPrefix="Sort by Card "
        />
        <Filter
          filterOptions={rarityFilterOptions}
          setFilterOptions={setRarityFilterOptions}
        />
        <Switch
          isLeftToggled={ownedFilter}
          setIsLeftToggled={setOwnedFilter}
          leftOption={"Owned"}
          rightOption={"All"}
        />
      </div>
      <div className="cardGrid">
        {selectedCards.map((sortableCard) => (
          <SortableCard
            key={sortableCard.instanceId}
            sortableCard={sortableCard}
            translucent={true} 
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
