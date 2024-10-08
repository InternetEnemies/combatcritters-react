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

interface InventoryProps {
  selectedCards: ISortableCard[];
  setSelectedCards: (cards: ISortableCard[]) => void;
}

const Inventory: React.FC<InventoryProps> = ({
  selectedCards,
  setSelectedCards,
}) => {
  const [userCardsManager] = useState<IUserCardsManager>(
    new UserCardsManager(
      ClientSingleton.getInstance(),
      ClientSingleton.getInstance().user
    )
  );
  const [cardQueryBuilder] = useState<ICardQueryBuilder>(
    userCardsManager.getBuilder()
  );

  const { sortOptions, selectedSortOption, setSelectedSortOption } =
    useCardSort();

  const {
    rarityFilterOptions,
    setRarityFilterOptions,
    ownedFilter,
    setOwnedFilter,
  } = useCardFilter();

  const memoizedRarityFilterOptions = useMemo(
    () =>
      rarityFilterOptions
        .filter((option) => option.toggled === true)
        .map((option) => option.id),
    [rarityFilterOptions]
  );

  const cardQuery = useCardQueryBuilder(
    cardQueryBuilder,
    selectedSortOption.id,
    memoizedRarityFilterOptions,
    ownedFilter
  );

  useEffect(() => {
    const fetchAndSetCards = async () => {
      if (cardQuery) {
        try {
          const cards = await userCardsManager.getCards(cardQuery);
          setSelectedCards(convertCardStackToSortable(cards));
        } catch (error) {
          console.error("Error fetching cards:", error);
        }
      }
    };

    fetchAndSetCards();
  }, [userCardsManager, cardQuery, setSelectedCards]);

  return (
    <div className="inventoryRoot">
      <div className="filterSortContainer">
        <div className="filterContainer">
          <Switch
            isLeftToggled={ownedFilter}
            setIsLeftToggled={setOwnedFilter}
            leftOption={"Owned"}
            rightOption={"All"}
          />
          <Filter
            filterOptions={rarityFilterOptions}
            setFilterOptions={setRarityFilterOptions}
          />
        </div>
        <SortDropdown
          dropdownOptions={sortOptions}
          selectedDropdownOption={selectedSortOption}
          setSelectedDropdownOption={setSelectedSortOption}
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
