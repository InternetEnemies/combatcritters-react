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
import { useState } from "react";

const Battle = () => {
  const [maxEnergy, setMaxEnergy] = useState<number>(0);
  const [maxHealth, setMaxHealth] = useState<number>(0);

  const {
    oppBufferCards,
    setOppBufferCards,
    oppInPlayCards,
    setOppInPlayCards,
    isOpponentTurn,
    setIsOpponentTurn,
    opponentHealth,
    setOpponentHealth,
    opponentEnergy,
    setOpponentEnergy
  } = useManageOpponent();

  const {
    userBufferCards,
    setUserBufferCards,
    userInPlayCards,
    setUserInPlayCards,
    isPlayerTurn,
    setIsPlayerTurn, 
    userHealth,
    setUserHealth,
    userEnergy,
    setUserEnergy
  } = useManageUser();

  const {
    hand,
    setHand,
    activeCardId,
    handleDragStart,
    handleDragEnd,
    drawPileSize,
    setDrawPileSize
  } = useHand(userBufferCards, setUserBufferCards);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} >
      <div className="battleRoot">
        <div className="playArea">
          <OpponentPlayArea
            bufferCards={oppBufferCards}
            inPlayCards={oppInPlayCards}
            isOpponentTurn={isOpponentTurn}
            opponentEnergy={opponentEnergy}
            opponentHealth={opponentHealth}
            maxEnergy={maxEnergy}
            maxHealth={maxHealth}
          />
        </div>
        <div className="playArea">
          <UserPlayArea
            bufferCards={userBufferCards}
            inPlayCards={userInPlayCards}
            isPlayerTurn={isPlayerTurn}
            isDragging={activeCardId !== null}
            userHealth={userHealth}
            userEnergy={userEnergy}
            maxEnergy={maxEnergy}
            maxHealth={maxHealth}
          />
        </div>
        <div className="handContainer">
          <Hand hand={hand} />
        </div>
      </div>
      <DragOverlay>
        {activeCardId !== null && (
          <HandCard
            card={hand[parseInt(activeCardId, 10)]} // Card being dragged
            scale={0.85}
            dragId={activeCardId}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default Battle;
