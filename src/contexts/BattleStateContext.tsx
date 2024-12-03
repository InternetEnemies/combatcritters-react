/**
 * @Created 2024-10-28
 * @Brief Global battle client context.
 */

import {
  BattleClient,
  IBattleClient,
  IBattleStateObserver,
  ICard,
  ICardState,
} from "combatcritters-ts";
import BattleStateObserver from "pages/Battle/BattleStateObserver";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface BattleStateType {
  userBufferCards: (ICardState | null)[];
  setUserBufferCards: (cards: (ICardState | null)[]) => void;
  userInPlayCards: (ICardState | null)[];
  setUserInPlayCards: (cards: (ICardState | null)[]) => void;
  isPlayerTurn: boolean;
  setIsPlayerTurn: (isTurn: boolean) => void;
  userHealth: number;
  setUserHealth: (health: number) => void;
  userEnergy: number;
  setUserEnergy: (energy: number) => void;
  oppBufferCards: (ICardState | null)[];
  setOppBufferCards: (cards: (ICardState | null)[]) => void;
  oppInPlayCards: (ICardState | null)[];
  setOppInPlayCards: (cards: (ICardState | null)[]) => void;
  isOpponentTurn: boolean;
  setIsOpponentTurn: (isTurn: boolean) => void;
  opponentHealth: number;
  setOpponentHealth: (health: number) => void;
  opponentEnergy: number;
  setOpponentEnergy: (energy: number) => void;
  hand: ICard[];
  setHand: (hand: ICard[]) => void;
  drawPileSize: number;
  setDrawPileSize: (size: number) => void;
  battleStateObserver: IBattleStateObserver;
}

const BattleStateContext = createContext<BattleStateType | undefined>(
  undefined
);

export const BattleStateProvider = ({ children }: { children: ReactNode }) => {
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

  const [userBufferCards, setUserBufferCards] = useState<(ICardState | null)[]>(
    [null, null, null, null, null]
  );

  const [userInPlayCards, setUserInPlayCards] = useState<(ICardState | null)[]>(
    [null, null, null, null, null]
  );

  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);

  const [userHealth, setUserHealth] = useState<number>(0);

  const [userEnergy, setUserEnergy] = useState<number>(0);

  const [hand, setHand] = useState<ICard[]>([]);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [drawPileSize, setDrawPileSize] = useState<number>(0);

  const [battleStateObserver, setBattleStateObserver] =
    useState<IBattleStateObserver>(
      new BattleStateObserver(
        setIsPlayerTurn,
        setUserHealth,
        setOpponentHealth,
        setUserEnergy,
        setOpponentEnergy,
        setHand,
        setDrawPileSize,
        setUserBufferCards,
        setOppBufferCards,
        setOppInPlayCards,
        setUserInPlayCards
      )
    );

  return (
    <BattleStateContext.Provider
      value={{
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
        hand,
        setHand,
        drawPileSize,
        setDrawPileSize,
        battleStateObserver
      }}
    >
      {children}
    </BattleStateContext.Provider>
  );
};

export const useBattleState = (): BattleStateType => {
  const context = useContext(BattleStateContext);
  if (context === undefined) {
    throw new Error("useBattleClient must be used within a CurrencyProvider");
  }
  return context;
};
