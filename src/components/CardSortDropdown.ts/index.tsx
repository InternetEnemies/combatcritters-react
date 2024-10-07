/**
 * @Created 2024-10-07
 * @Brief Dropdown of card sort options used in the inventory.
 */

import React from "react";
import "./cardSortDropdown.css";
import { ICardSortOption } from "interfaces/ICardSortOption";

interface CardSortDropdownProps {
  dropdownOptions: ICardSortOption[];
  selectedDropdownOption: ICardSortOption;
  setSelectedDropdownOption: (option: ICardSortOption) => void;
}

const CardSortDropdown: React.FC<CardSortDropdownProps> = ({
  dropdownOptions,
  selectedDropdownOption,
  setSelectedDropdownOption,
}) => {
  return (
    <div className="cardSortDropdownRoot">
      <select
        value={selectedDropdownOption.id}
        onChange={(e) => {
          const selectedOption = dropdownOptions.find(
            (option) => option.id == e.target.value
          );
          if (selectedOption) {
            setSelectedDropdownOption(selectedOption);
          }
        }}
        className="select"
      >
        {dropdownOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {`${"Sort by Card "}${option.name}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CardSortDropdown;
