/**
 * @Created 2024-10-07
 * @Brief The Card view that is used throughout the application.
 */

import React from "react";
import "./currency.css";

interface CurrencyCompProps {
  amount: number;
  style?: React.CSSProperties;
  scale?: number; // Scale the size of the currency
}

const CurrencyComp: React.FC<CurrencyCompProps> = ({
  amount,
  style,
  scale = 1,
}) => {
  const FONT_SIZE: number = 1 * scale; //The default width of the currency * scale
  const GAP: number = 3 * scale; // The default gap * scale

  return (
    <div
      className="currencyRoot"
      style={{
        ...style,
        fontSize: `${FONT_SIZE}em`,
        gap: `${GAP}px`,
        lineHeight: 1,
      }}
    >
      <span className="currencyAmount">{amount}</span>
      <img
        className="currencyImage"
        src="assets/images/currency.svg"
        alt="Currency"
        style={{ height: `${FONT_SIZE}em` }}
      />
    </div>
  );
};

export default CurrencyComp;
