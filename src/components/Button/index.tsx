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
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className = "",
  disabled = false,
  style = {},
}) => {
  return (
    <button
      className={`customButton ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {text}
    </button>
  );
};

export default Button;
