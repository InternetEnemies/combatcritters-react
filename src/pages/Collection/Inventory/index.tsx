import React, { useEffect, useState, useMemo } from "react";
import "./inventory.css";
import { ISortableCard } from "interfaces/ISortableCard";
import SortableCard from "components/SortableCard";
import { convertCardStackToSortable } from "utils/collectionUtils";
import SortDropdown from "components/CardSortDropdown.ts";
import Filter from "components/Filter";
import Switch from "components/Switch";
import { useCardSort } from "hooks/useCardSort";
import { useCardFilter } from "hooks/useCardFilter";
import {
  ICardQueryBuilder,
  IUserCardsManager,
  UserCardsManager,
} from "combatcritters-ts";
import { useCardQueryBuilder } from "hooks/useCardQueryBuilder";
import { ClientSingleton } from "ClientSingleton";
import { useInventoryUpdate } from "hooks/useInventoryUpdate";

interface InventoryProps {
  selectedCards: ISortableCard[];
  setSelectedCards: (cards: ISortableCard[]) => void;
}

const Inventory: React.FC<InventoryProps> = ({
  selectedCards,
  setSelectedCards,
}) => {
  // Memoize userCardsManager to ensure it's stable across renders
  const [userCardsManager] = useState<IUserCardsManager>(
    new UserCardsManager(
      ClientSingleton.getInstance(),
      ClientSingleton.getInstance().user
    )
  );
  const [cardQueryBuilder] = useState<ICardQueryBuilder>(
    userCardsManager.getBuilder()
  );

  // Sorting and filtering hooks
  const { sortOptions, selectedSortOption, setSelectedSortOption } =
    useCardSort();

  const {
    rarityFilterOptions,
    setRarityFilterOptions,
    ownedFilter,
    setOwnedFilter,
  } = useCardFilter();

  // Memoize the rarityFilterOptions to prevent unnecessary re-renders
  const memoizedRarityFilterOptions = useMemo(
    () => rarityFilterOptions.map((option) => option.id),
    [rarityFilterOptions]
  );

  // Memoize cardQuery, so it only changes when its inputs (sortOption, rarityFilterOptions, ownedFilter) change
  const cardQuery = useCardQueryBuilder(
    cardQueryBuilder,
    selectedSortOption.id,
    memoizedRarityFilterOptions,
    ownedFilter
  );

  // useEffect that will trigger on mount and when cardQuery changes
  useEffect(() => {
    const fetchAndSetCards = async () => {
      try {
        const cards = await userCardsManager.getCards(cardQuery);
        setSelectedCards(convertCardStackToSortable(cards));
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    // Trigger fetch on mount and whenever cardQuery changes
    fetchAndSetCards();
  }, [userCardsManager, cardQuery, setSelectedCards]);

  return (
    <div className="inventoryRoot">
      <div className="filterSortContainer">
        <SortDropdown
          dropdownOptions={sortOptions}
          selectedDropdownOption={selectedSortOption}
          setSelectedDropdownOption={setSelectedSortOption}
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
