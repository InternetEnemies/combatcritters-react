/**
 * @Created 2024-11-24
 * @Brief Battles page!.
 */

import "./battle.css";
import OpponentPlayArea from "./components/OpponentPlayArea";
import UserPlayArea from "./components/UserPlayArea";
import Hand from "./components/Hand";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useHand } from "./hooks/useHand";
import HandCard from "./components/HandCard";
import { useEffect, useState } from "react";
import { useBattleState } from "contexts/BattleStateContext";
import { useBattleClient } from "contexts/BattleClientContext";
import Popup from "components/Popup";
import LeaveMatchPopup from "./components/LeaveMatchPopup";
import { useNavigate } from "react-router-dom";

const Battle = () => {
  const {battleClient} = useBattleClient();
  const navigate = useNavigate();

  const {
    oppBufferCards,
    oppInPlayCards,
    isOpponentTurn,
    opponentHealth,
    opponentEnergy,
    userBufferCards,
    userInPlayCards,
    isPlayerTurn,
    userHealth,
    userEnergy,
    hand, 
  } = useBattleState();

  const [showPopup, setShowPopup] = useState<boolean>(false);

  /**
   * On mount, if the battle client isn't initialized, return home.
   */
  useEffect(() => {
    if (!battleClient) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    activeCardId,
    handleDragStart,
    handleDragEnd,
  } = useHand(hand);

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
      <img onClick={() => {setShowPopup(true)}} className="leaveIcon" src="/assets/images/logout.svg" alt="Leave"/>
      <Popup popupContent={<LeaveMatchPopup setShowPopup={setShowPopup}/>} isVisible={showPopup} setIsVisible={setShowPopup}/>
    </DndContext>
  );
};

export default Battle;
