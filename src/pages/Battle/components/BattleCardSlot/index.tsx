/**
 * @Created 2024-10-07
 * @Brief The Pack view that is used throughout the application.
 */

import { ICardState } from "interfaces/ICardState";
import Card, { DEFAULT_CARD_WIDTH } from "components/Card";
import "./battleCardSlot.css"

interface BattleCardSlotProps {
  cardState: ICardState | null;
  scale: number;
  isPlayerSlot: boolean;
  isBuffer: boolean;
}

const BattleCardSlot: React.FC<BattleCardSlotProps> = ({
  cardState,
  scale,
  isPlayerSlot,
  isBuffer,
}) => {
  const WIDTH: number = DEFAULT_CARD_WIDTH * scale;
  return (
    <div className="battleCardSlot">
      {cardState ? (
        <Card card={cardState.card} scale={scale} />
      ) : (
        <div
          className="cardRoot cardSlotPlaceholder"
          style={{
            width: `${WIDTH}px`,
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
