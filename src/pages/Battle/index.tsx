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
    setOppBufferCards,
    oppInPlayCards,
    setOppInPlayCards,
    isOpponentTurn,
    setIsOpponentTurn,
    opponentHealth,
    setOpponentHealth,
    opponentEnergy,
    setOpponentEnergy,
    userBufferCards,
    setUserBufferCards,
    userInPlayCards,
    setUserInPlayCards,
    isPlayerTurn,
    setIsPlayerTurn,
    userHealth,
    setUserHealth,
    userEnergy,
    setUserEnergy,
    hand, 
    setHand,
    drawPileSize,
    setDrawPileSize,
  } = useBattleState();

  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    if(!battleClient) {
      navigate("/home");
    }
  }, []);
  
  // const {
  //   oppBufferCards,
  //   setOppBufferCards,
  //   oppInPlayCards,
  //   setOppInPlayCards,
  //   isOpponentTurn,
  //   setIsOpponentTurn,
  //   opponentHealth,
  //   setOpponentHealth,
  //   opponentEnergy,
  //   setOpponentEnergy
  // } = useManageOpponent();

  // const {
  //   userBufferCards,
  //   setUserBufferCards,
  //   userInPlayCards,
  //   setUserInPlayCards,
  //   isPlayerTurn,
  //   setIsPlayerTurn, 
  //   userHealth,
  //   setUserHealth,
  //   userEnergy,
  //   setUserEnergy
  // } = useManageUser();

  const {
    // hand,
    // setHand,
    activeCardId,
    handleDragStart,
    handleDragEnd,
    // drawPileSize,
    // setDrawPileSize
  } = useHand(userBufferCards, setUserBufferCards, hand, setHand, drawPileSize, setDrawPileSize);

  const endTurn = () => {
    battleClient?.battleController.endTurn();
  }
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
