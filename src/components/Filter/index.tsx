/**
 * @Created 2024-10-07
 * @Brief General filter dropdown.
 */

import React, { useState, useRef, useEffect } from "react";
import "./filter.css";
import filterIcon from "assets/icons/filter.svg";
import { IFilterOption } from "interfaces/IFilterOption";

interface FilterProps<T> {
  filterOptions: IFilterOption<T>[];
  setFilterOptions: (options: IFilterOption<T>[]) => void;
}

const Filter = <T,>({ filterOptions, setFilterOptions }: FilterProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleFilter = (filterLabel: string) => {
    const updatedOptions = filterOptions.map((filter) =>
      filter.label === filterLabel ? { ...filter, toggled: !filter.toggled } : filter
    );
    setFilterOptions(updatedOptions);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="filter-button">
        <div className="filterIconContainer">
          <img src={filterIcon} alt="Filter Icon" className="filterIcon" />
        </div>
      </button>

      {isOpen && (
        <div className="dropdownMenu">
          {filterOptions.map((filter) => (
            <label key={filter.label} className="filterOption">
              <input
                type="checkbox"
                checked={filter.toggled}
                onChange={() => toggleFilter(filter.label)}
              />
              {filter.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
