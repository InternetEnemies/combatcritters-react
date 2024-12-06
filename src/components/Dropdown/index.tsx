import React, { useState, useEffect, useRef } from "react";
import "./dropdown.css";
import { IDropdownOption } from "interfaces/IDropdownOption";

interface DropdownProps<T> {
  dropdownOptions: IDropdownOption<T>[];
  selectedDropdownOption: IDropdownOption<T> | null;
  setSelectedDropdownOption: (option: IDropdownOption<T>) => void;
  isEmpty?: boolean; // Are there any items in the list?
  isEmptyMessage?: string; // Message to display in list if there are no items.
  labelPrefix?: string; // Optional prefix to add before each of the dropdown options.
  noSelectionLabel?: string; //Optional label indicating what to do when there is nothing selected.
  style?: React.CSSProperties;
}

const Dropdown = <T,>({
  dropdownOptions,
  selectedDropdownOption,
  setSelectedDropdownOption,
  isEmpty = false, // Default to items in the list
  isEmptyMessage = "No options", // Default message
  labelPrefix,
  style,
  noSelectionLabel = "Select an option"
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Create a reference for the dropdown

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false); // Close the dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up the event listener
    };
  }, []);

  if (isEmpty) {
    return (
      <div className="dropdown" style={{...style}}>
        <div className="select disabled">
          <span>{isEmptyMessage}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dropdown" ref={dropdownRef} style={{ ...style }}>
      <div className="select" onClick={toggleDropdown}>
        <span>
          {selectedDropdownOption
            ? `${labelPrefix ? labelPrefix : ""}${selectedDropdownOption.label}`
            : noSelectionLabel}
        </span>
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {dropdownOptions.map((option) => (
            <li
              key={option.label}
              className="dropdown-item"
              onClick={() => {
                setSelectedDropdownOption(option);
                setIsOpen(false);
              }}
            >
              {`${labelPrefix ? labelPrefix : ""}${option.label}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
