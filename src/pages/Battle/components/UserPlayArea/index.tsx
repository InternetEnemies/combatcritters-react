
/**
 * @Created 2024-11-25
 * @Brief Contains all the user related components.
 */
import "../../styles/sharedPlayArea.css";
import "./userPlayArea.css"
import { ICardState } from "interfaces/ICardState";
import LoadingCards from "../LoadingCards";
import BattleCardSlot from "../BattleCardSlot";
import DroppableSlot from "pages/Battle/components/DroppableSlot";
import HealthBar from "../ElixirHealthBar";
import ElixirHealthBar from "../ElixirHealthBar";
import { useState } from "react";

interface UserPlayAreaProps {
  bufferCards: (ICardState | null)[];
  inPlayCards: (ICardState | null)[];
  isDragging: boolean;
}

const UserPlayArea: React.FC<UserPlayAreaProps> = ({
  bufferCards,
  inPlayCards,
  isDragging
}) => {

  return (
    <div className="playAreaRoot">
      <div className="healthEnergyContainer" >
        <ElixirHealthBar
          currAmount={2}
          maxAmount={5}
          isUsersBar={true}
          isHealth={false}
        />
        <ElixirHealthBar
          currAmount={14}
          maxAmount={25}
          isUsersBar={true}
          isHealth={true}
        />
      </div>
      <div className="playAreaCardsContainer">
        <div className="inPlayCards">
          {inPlayCards.map((cardState, index) => (
            <BattleCardSlot
              key={index}
              cardState={cardState}
              scale={0.85}
              isPlayerSlot={true}
              isBuffer={false}
            />
          ))}
        </div>
        <div className="bufferCards">
          {bufferCards.map((cardState, index) => (
            <DroppableSlot
              key={index}
              slotId={index.toString()}
              cardState={cardState}
              scale={0.85}
              isDragging={isDragging}
            />
          ))}
        </div>
      </div>
      <div className="endTurnContainer">
        <img
          className="endTurnButton"
          alt="End turn"
          src="assets/images/playButton.svg"
        />
      </div>
    </div>
  );
};

export default UserPlayArea;
