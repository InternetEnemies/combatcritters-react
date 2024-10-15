/**
 * @Created 2024-10-07
 * @Brief General Button component.
 */

import React from "react";
import "./button.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className = "defaultButton",
  disabled = false,
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
