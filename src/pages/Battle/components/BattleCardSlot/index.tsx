/**
 * @Created 2024-11-27
 * @Brief The slot component used in the battle page. This can be either a card
 *        or a placeholder slot.
 */

import { ICardState } from "combatcritters-ts";
import Card, { DEFAULT_CARD_WIDTH } from "components/Card";
import "./battleCardSlot.css";
import { useBattleClient } from "contexts/BattleClientContext";

interface BattleCardSlotProps {
  cardState: ICardState | null;
  scale: number;
  isPlayerSlot: boolean;
  isBuffer: boolean;
  position: number;
}

const BattleCardSlot: React.FC<BattleCardSlotProps> = ({
  cardState,
  scale,
  isPlayerSlot,
  isBuffer,
  position
}) => {
  const WIDTH: number = DEFAULT_CARD_WIDTH * scale;
  const {battleClient} = useBattleClient();

  const sacrifice = () => {
    battleClient?.battleController.sacrifice(position);
  }
  return (
    <div
      className={`battleCardSlot ${isPlayerSlot ? "playerSlot" : ""}`}
      style={{ width: `${WIDTH}px` }}
    >
      {cardState ? (
        <div className="cardContainer">
          <Card
            card={cardState.card}
            scale={scale}
            style={{ cursor: "default" }}
          />
          {isPlayerSlot && (
            <img
              alt="Skull"
              src="assets/images/skull.svg"
              className="skullButton"
            />
          )}
        </div>
      ) : (
        <div
          className="cardRoot cardSlotPlaceholder"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isBuffer && (
            <img
              className="arrowImage"
              alt="Arrow"
              src="assets/images/arrow.svg"
              style={isPlayerSlot ? { transform: "rotate(180deg)" } : {}}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BattleCardSlot;
