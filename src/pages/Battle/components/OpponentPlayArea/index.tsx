/**
 * @Created 2024-11-25
 * @Brief Contains all the component related components.
 */

import "../../styles/sharedPlayArea.css";
import { ICardState } from "combatcritters-ts";
import LoadingCards from "../LoadingCards";
import BattleCardSlot from "../BattleCardSlot";
import ElixirHealthBar from "../ElixirHealthBar";

interface OpponentPlayAreaProps {
  bufferCards: (ICardState | null)[];
  inPlayCards: (ICardState | null)[];
  isOpponentTurn: boolean;
  opponentEnergy: number;
  opponentHealth: number;
  maxEnergy: number;
  maxHealth: number;
}

const OpponentPlayArea: React.FC<OpponentPlayAreaProps> = ({
  bufferCards,
  inPlayCards,
  isOpponentTurn,
  opponentEnergy,
  opponentHealth,
  maxEnergy,
  maxHealth
}) => {
  return (
    <div className="playAreaRoot">
      <div className="healthEnergyContainer">
        <ElixirHealthBar
          currAmount={opponentEnergy}
          maxAmount={maxEnergy}
          isHealth={false}
          isUsersBar={false}
        />
        <ElixirHealthBar
          currAmount={opponentHealth}
          maxAmount={maxHealth}
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
        {isOpponentTurn ? (
          <LoadingCards />
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

export default OpponentPlayArea;
