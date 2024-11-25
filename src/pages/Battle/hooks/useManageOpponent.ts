/**
 * @Created 2024-10-07
 * @Brief Hook to manage opponent state.
 */

import { useEffect, useState } from "react";
import { ClientSingleton } from "ClientSingleton";
import { ICardState } from "interfaces/ICardState";

export const useManageOpponent = () => {

  useEffect(() => {
    const setHandCards = async () => {
      //TODO remove this
      const builder =
        await ClientSingleton.getInstance().user.cards.getBuilder();
      const cards = await ClientSingleton.getInstance().user.cards.getCards(
        builder.build()
      );

      setOppBufferCards([
        null,
        null,
        { card: cards[0].getItem(), health: 1 },
        null,
        null,
      ]);
    };

    setHandCards();
  }, []);

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

  return {
    oppBufferCards,
    setOppBufferCards,
    oppInPlayCards,
    setOppInPlayCards,
  };
};
