/**
 * @Created 2024-11-24
 * @Brief Battles page!.
 */

import "./battle.css";
import OpponentPlayArea from "./components/OpponentPlayArea";
import { useManageOpponent } from "./hooks/useManageOpponent";
import { useManageUser } from "./hooks/useManageUser";
import UserPlayArea from "./components/UserPlayArea";
import Hand from "./components/Hand";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useHand } from "./hooks/useHand";
import HandCard from "./components/HandCard";

const Battle = () => {
  const {
    oppBufferCards,
    setOppBufferCards,
    oppInPlayCards,
    setOppInPlayCards,
  } = useManageOpponent();

  const {
    userBufferCards,
    setUserBufferCards,
    userInPlayCards,
    setUserInPlayCards,
  } = useManageUser();

  const {
    hand,
    setHand,
    activeCardId,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  } = useHand(userBufferCards, setUserBufferCards);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      <div className="battleRoot">
        <div className="playArea">
          <OpponentPlayArea
            bufferCards={oppBufferCards}
            inPlayCards={oppInPlayCards}
          />
        </div>
        <div className="playArea">
          <UserPlayArea
            bufferCards={userBufferCards}
            inPlayCards={userInPlayCards}
            isDragging={activeCardId !== null}
          />
        </div>
        <div className="handContainer">
          <Hand hand={hand} activeCardId={activeCardId} />
        </div>
      </div>
      <DragOverlay>
        {activeCardId !== null && (
          <HandCard
            card={hand[parseInt(activeCardId, 10)]} // Get the active card by ID
            scale={0.85}
            dragId={activeCardId}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default Battle;