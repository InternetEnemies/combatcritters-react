import React, { useState, useRef, useEffect } from "react";
import "./filter.css"; 
import filterIcon from "assets/icons/filter.svg";
import { IFilterOption } from "interfaces/IFilterOption";

interface FilterProps {
  filterOptions: IFilterOption[]; 
  setFilterOptions: (options: IFilterOption[]) => void;
}

const Filter: React.FC<FilterProps> = ({ filterOptions, setFilterOptions }) => {
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

  const toggleFilter = (filterId: number) => {
    const updatedOptions = filterOptions.map((filter) =>
      filter.id === filterId
        ? { ...filter, toggled: !filter.toggled } 
        : filter
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
            <label key={filter.id} className="filterOption">
              <input
                type="checkbox"
                checked={filter.toggled} 
                onChange={() => toggleFilter(filter.id)}
              />
              {filter.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
