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
import { useBattleClient } from "contexts/BattleClientContext";

interface UserPlayAreaProps {
  bufferCards: (ICardState | null)[];
  inPlayCards: (ICardState | null)[];
  isDragging: boolean;
  isPlayerTurn: boolean;
  userHealth: number;
  userEnergy: number;
}

const UserPlayArea: React.FC<UserPlayAreaProps> = ({
  bufferCards,
  inPlayCards,
  isDragging,
  isPlayerTurn,
  userHealth,
  userEnergy,


  
}) => {
  const {battleClient} = useBattleClient();

  const endTurn = () => {
    battleClient?.battleController.endTurn();
  }
  return (

    <div className="playAreaRoot">
      <div className="healthEnergyContainer">
        <ElixirHealthBar
          currAmount={userEnergy}
         
          isUsersBar={true}
          isHealth={false}
        />
        <ElixirHealthBar
          currAmount={userHealth}
       
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
              position={index}
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
              position={index}
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
            onClick={endTurn}
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
