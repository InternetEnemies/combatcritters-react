/**
 * @Created 2024-11-25
 * @Brief Component containing all the opponent components.
 */

import "../../styles/sharedPlayArea.css";
import { ICardState } from "interfaces/ICardState";
import LoadingCards from "../LoadingCards";
import { useEffect, useState } from "react";
import BattleCardSlot from "../BattleCardSlot";
import ElixirHealthBar from "../ElixirHealthBar";

interface OpponentPlayAreaProps {
  bufferCards: (ICardState | null)[];
  inPlayCards: (ICardState | null)[];
}

const OpponentPlayArea: React.FC<OpponentPlayAreaProps> = ({
  bufferCards,
  inPlayCards,
}) => {
  return (
    <div className="playAreaRoot" >
      <div className="healthEnergyContainer" >
        <ElixirHealthBar
          currAmount={3}
          maxAmount={5}
          isHealth={false}
          isUsersBar={false}
        />
        <ElixirHealthBar
          currAmount={20}
          maxAmount={25}
          isHealth={true}
          isUsersBar={false}
        />
      </div>
      <div className="playAreaCardsContainer">
        <div className="bufferCards">
          {bufferCards.map((cardState, index) => (
            <BattleCardSlot
              key={index}
              cardState={cardState}
              scale={0.85}
              isPlayerSlot={false}
              isBuffer={true}
            />
          ))}
        </div>

        <div className="inPlayCards">
          {inPlayCards.map((cardState, index) => (
            <BattleCardSlot
              key={index}
              cardState={cardState}
              scale={0.85}
              isPlayerSlot={false}
              isBuffer={false}
            />
          ))}
        </div>
      </div>
      <div className="endTurnContainer">
        <LoadingCards />
      </div>
    </div>
  );
};

export default OpponentPlayArea;
