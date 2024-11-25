
/**
 * @Created 2024-11-25
 * @Brief Contains all the user related components.
 */
import "../../styles/sharedPlayArea.css";
import { ICardState } from "interfaces/ICardState";
import LoadingCards from "../LoadingCards";
import BattleCardSlot from "../BattleCardSlot";
import DroppableSlot from "pages/Battle/components/DroppableSlot";

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
      <div className="healthEnergyContainer"></div>
      <div className="playAreaCardsContainer">
        <div className="inPlayCards">
          {inPlayCards.map((cardState, index) => (
            <BattleCardSlot key={index} cardState={cardState} scale={0.85} isPlayerSlot={true} isBuffer={false}/>
          ))}
        </div>
        <hr className="separator"></hr>
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
        <LoadingCards />
      </div>
    </div>
  );
};

export default UserPlayArea;
