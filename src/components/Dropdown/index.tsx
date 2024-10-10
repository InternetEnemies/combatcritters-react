/**
 * @Created 2024-10-07
 * @Brief General dropdown component.
 */

import React from "react";
import "./dropdown.css";
import { IDropdownOption } from "interfaces/IDropdownOption";

interface DropdownProps<T> {
  dropdownOptions: IDropdownOption<T>[];
  selectedDropdownOption: IDropdownOption<T>;
  setSelectedDropdownOption: (option: IDropdownOption<T>) => void;
  isEmpty?: boolean; 
  isEmptyMessage?: string;
  className?: string;
  labelPrefix?: string; // Optional prefix to add before each of the dropdown options.
}

const Dropdown = <T,>({
  dropdownOptions,
  selectedDropdownOption,
  setSelectedDropdownOption,
  isEmpty = false,
  isEmptyMessage = "No options", 
  className,
  labelPrefix,
}: DropdownProps<T>) => {
  if (isEmpty) {
    return (
      <div className={`dropdown ${className ? className : ""}`}>
        <select disabled className="select">
          <option>{isEmptyMessage}</option>
        </select>
      </div>
    );
  }

  return (
    <div className={`dropdown ${className ? className : ""}`}>
      <select
        value={selectedDropdownOption.label}
        onChange={(e) => {
          const selectedOption = dropdownOptions.find(
            (option) => option.label === e.target.value
          );
          if (selectedOption) {
            setSelectedDropdownOption(selectedOption);
          }
        }}
        className="select"
      >
        {dropdownOptions.map((option) => (
          <option key={option.label} value={option.label}>
            {`${labelPrefix ? labelPrefix : ""}${option.label}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
