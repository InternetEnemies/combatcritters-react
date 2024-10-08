/**
 * @Created 2024-10-07
 * @Brief General dropdown component.
 */

import React from "react";
import "./dropdown.css";
import { IDropdownOption } from "interfaces/IDropdownOption";

interface DropdownProps {
  dropdownOptions: IDropdownOption[];
  selectedDropdownOption: IDropdownOption;
  setSelectedDropdownOption: (option: IDropdownOption) => void;
  className?: string;
  labelPrefix?: string; //Optional prefix to add before each of the dropdown options.
}

const Dropdown: React.FC<DropdownProps> = ({
  dropdownOptions,
  selectedDropdownOption,
  setSelectedDropdownOption,
  className,
  labelPrefix, 
}) => {
  return (
    <div className={`dropdown ${className}`}>
      <select
        value={selectedDropdownOption.id}
        onChange={(e) => {
          const selectedOption = dropdownOptions.find(
            (option) => option.id === Number(e.target.value)
          );
          if (selectedOption) {
            setSelectedDropdownOption(selectedOption);
          }
        }}
        className="select"
      >
        {dropdownOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {`${labelPrefix ? labelPrefix : ""}${option.name}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
