/**
 * @Created 2024-11-18
 * @Brief The currency view used in the wagering page.
 */

import React from "react";
import "./currencyWager.css";
import { ICurrency } from "combatcritters-ts";
import CurrencyComp from "components/CurrencyComp";

interface CurrencyWagerProps {
  currency: ICurrency;
  onClick: () => void;
  iconPath: string;
}

const CurrencyWager: React.FC<CurrencyWagerProps> = ({
  currency,
  onClick,
  iconPath,
}) => {
  return (
    <div className="currencyWagerRoot">
      <img className="addCurrencyIcon" src={iconPath} onClick={onClick} />
      <span style={{ fontSize: "20px", cursor: "default" }}>·</span>
      <CurrencyComp amount={currency.coins} scale={1.1} style={{ cursor: "default" }} />
    </div>
  );
};

export default CurrencyWager;
