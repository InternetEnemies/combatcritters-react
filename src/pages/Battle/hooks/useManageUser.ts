/**
 * @Created 2024-10-07
 * @Brief Hook to manage user state.
 */

import { ICardState } from "interfaces/ICardState";
import { useState } from "react";

export const useManageUser = () => {
  const [userBufferCards, setUserBufferCards] = useState<(ICardState | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [userInPlayCards, setUserInPlayCards] = useState<(ICardState | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);

  const [userHealth, setUserHealth] = useState<number>(0);

  const [userEnergy, setUserEnergy] = useState<number>(0);

  return {
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
  };
};
