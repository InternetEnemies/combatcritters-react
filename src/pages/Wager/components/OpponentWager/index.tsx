/**
 * @Created 2024-11-18
 * @Brief The opponent's wager.
 */

import React from "react";
import "./../../styles/sharedWager.css";

interface OpponentWagerProps {

}

const OpponentWager: React.FC<OpponentWagerProps> = ({
  
}) => {
 
  return (
    <div className="sharedWagerRoot">
      <span className="sharedWagerText">Opponent's Wagered Items</span>
    </div>
  );
};

export default OpponentWager;
