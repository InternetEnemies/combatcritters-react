/**
 * @Created 2024-10-07
 * @Brief Hook to manage opponent state.
 */

import { useState } from "react";
import { ICardState } from "interfaces/ICardState";

export const useManageOpponent = () => {

  const [oppBufferCards, setOppBufferCards] = useState<(ICardState | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [oppInPlayCards, setOppInPlayCards] = useState<(ICardState | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [isOpponentTurn, setIsOpponentTurn] = useState<boolean>(true);

  const [opponentHealth, setOpponentHealth] = useState<number>(0);

  const [opponentEnergy, setOpponentEnergy] = useState<number>(0);

  return {
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
  };
};
