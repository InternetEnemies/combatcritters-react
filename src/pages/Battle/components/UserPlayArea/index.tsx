/**
 * @Created 2024-11-25
 * @Brief Contains all the user related components.
 */
import "../../styles/sharedPlayArea.css";
import "./userPlayArea.css";
import { ICardState } from "combatcritters-ts";
import BattleCardSlot from "../BattleCardSlot";
import DroppableSlot from "pages/Battle/components/DroppableSlot";
import ElixirHealthBar from "../ElixirHealthBar";

interface UserPlayAreaProps {
  bufferCards: (ICardState | null)[];
  inPlayCards: (ICardState | null)[];
  isDragging: boolean;
  isPlayerTurn: boolean;
  userHealth: number;
  userEnergy: number;
  maxEnergy: number;
  maxHealth: number;
}

const UserPlayArea: React.FC<UserPlayAreaProps> = ({
  bufferCards,
  inPlayCards,
  isDragging,
  isPlayerTurn,
  userHealth,
  userEnergy,
  maxEnergy, 
  maxHealth
  
}) => {
  return (
    <div className="playAreaRoot">
      <div className="healthEnergyContainer">
        <ElixirHealthBar
          currAmount={userEnergy}
          maxAmount={maxEnergy}
          isUsersBar={true}
          isHealth={false}
        />
        <ElixirHealthBar
          currAmount={userHealth}
          maxAmount={maxHealth}
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
        {isPlayerTurn ? (
          <img
            className="endTurnButton"
            alt="End turn"
            src="assets/images/playButton.svg"
          />
        ) : (
          <img
            className="turnFinishedCheck"
            alt="Checkmark"
            src="assets/images/checkmark2.svg"
          />
        )}
      </div>
    </div>
  );
};

export default UserPlayArea;
