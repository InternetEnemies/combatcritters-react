/**
 * @Created 2024-11-25
 * @Brief Component containing all the opponent components.
 */

import "../../styles/sharedPlayArea.css";
import { ICardState } from "interfaces/ICardState";
import LoadingCards from "../LoadingCards";
import { useEffect } from "react";
import BattleCardSlot from "../BattleCardSlot";

interface OpponentPlayAreaProps {
  bufferCards: (ICardState | null)[];
  inPlayCards: (ICardState | null)[];
}

const OpponentPlayArea: React.FC<OpponentPlayAreaProps> = ({
  bufferCards,
  inPlayCards,
}) => {
  useEffect(() => {
    console.log(bufferCards);
  }, [bufferCards]);
  //TODO remove this
  return (
    <div className="playAreaRoot">
      <div className="healthEnergyContainer"></div>
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

        <hr className="separator"></hr>
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
