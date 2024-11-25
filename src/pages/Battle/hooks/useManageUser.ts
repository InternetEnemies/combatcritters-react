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

  return {
    userBufferCards,
    setUserBufferCards,
    userInPlayCards,
    setUserInPlayCards,
  };
};
