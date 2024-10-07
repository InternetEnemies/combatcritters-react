import React from "react";
import "./dropdown.css";
import { IDropdownOption } from "interfaces/IDropdownOption";

interface DropdownProps {
  dropdownOptions: IDropdownOption[];
  selectedDropdownOption: IDropdownOption;
  setSelectedDropdownOption: (option: IDropdownOption) => void;
  className?: string;
  labelPrefix?: string;
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

// import React from "react";
// import "./dropdown.css"; // Generic CSS file, can add styles for the base dropdown

// interface DropdownProps<T> {
//   options: T[];
//   selectedOption: T;
//   setSelectedOption: (option: T) => void;
//   getOptionLabel: (option: T) => string;
//   getOptionValue: (option: T) => string | number;
//   className?: string; // Allows different styles to be applied
//   style?: React.CSSProperties; // Allows inline styles for more specific styling
// }

// const Dropdown = <T extends unknown>({
//   options,
//   selectedOption,
//   setSelectedOption,
//   getOptionLabel,
//   getOptionValue,
//   className = "",
//   style = {},
// }: DropdownProps<T>) => {
//   return (
//     <div className={`dropdown ${className}`} style={style}>
//       <select
//         value={getOptionValue(selectedOption)}
//         onChange={(e) => {
//           const selectedValue = e.target.value;
//           const option = options.find(
//             (opt) => String(getOptionValue(opt)) === selectedValue
//           );
//           if (option) setSelectedOption(option);
//         }}
//         className="dropdownSelect" // You can apply generic select styles here
//       >
//         {options.map((option) => (
//           <option key={getOptionValue(option)} value={getOptionValue(option)}>
//             {getOptionLabel(option)}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default Dropdown;
