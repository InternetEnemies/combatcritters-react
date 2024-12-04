/**
 * @Created 2024-10-28
 * @Brief Global battle state context.
 */

import {
  IBattleStateObserver,
  ICard,
  ICardState,
} from "combatcritters-ts";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

//Please avert your eyes
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
  const [drawPileSize, setDrawPileSize] = useState<number>(0);

  const [battleStateObserver] =
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
    throw new Error("useBattleState must be used within a BattleStateProvider");
  }
  return context;
};

/**
 * Implementation of IBattleStateObserver to be passed to the wrapper.
 */
class BattleStateObserver implements IBattleStateObserver {
  private setPlayerTurnCallback: (isPlayerTurn: boolean) => void;
  private setPlayerHealthCallback: (health: number) => void;
  private setEnemyHealthCallback: (health: number) => void;
  private setPlayerEnergyCallback: (energy: number) => void;
  private setEnemyEnergyCallback: (energy: number) => void;
  private setHandCallback: (cards: ICard[]) => void;
  private setDrawPileSizeCallback: (size: number) => void;
  private setPlayerBufferCardsCallback: (
    cardStates: (ICardState | null)[]
  ) => void;
  private setEnemyBufferCardsCallback: (
    cardStates: (ICardState | null)[]
  ) => void;
  private setEnemyCardsCallback: (cardStates: (ICardState | null)[]) => void;
  private setPlayerCardsCallback: (cardStates: (ICardState | null)[]) => void;

  constructor(
    setPlayerTurn: (isPlayerTurn: boolean) => void,
    setPlayerHealth: (health: number) => void,
    setEnemyHealth: (health: number) => void,
    setPlayerEnergy: (energy: number) => void,
    setEnemyEnergy: (energy: number) => void,
    setHand: (cards: ICard[]) => void,
    setDrawPileSize: (size: number) => void,
    setPlayerBufferCards: (cardStates: (ICardState | null)[]) => void,
    setEnemyBufferCards: (cardStates: (ICardState | null)[]) => void,
    setEnemyCards: (cardStates: (ICardState | null)[]) => void,
    setPlayerCards: (cardStates: (ICardState | null)[]) => void
  ) {
    this.setPlayerTurnCallback = setPlayerTurn;
    this.setPlayerHealthCallback = setPlayerHealth;
    this.setEnemyHealthCallback = setEnemyHealth;
    this.setPlayerEnergyCallback = setPlayerEnergy;
    this.setEnemyEnergyCallback = setEnemyEnergy;
    this.setHandCallback = setHand;
    this.setDrawPileSizeCallback = setDrawPileSize;
    this.setPlayerBufferCardsCallback = setPlayerBufferCards;
    this.setEnemyBufferCardsCallback = setEnemyBufferCards;
    this.setEnemyCardsCallback = setEnemyCards;
    this.setPlayerCardsCallback = setPlayerCards;
  }

  setPlayerTurn(isPlayerTurn: boolean): void {
    this.setPlayerTurnCallback(isPlayerTurn);
  }

  setPlayerHealth(health: number): void {
    this.setPlayerHealthCallback(health);
  }

  setEnemyHealth(health: number): void {
    this.setEnemyHealthCallback(health);
  }

  setPlayerEnergy(energy: number): void {
    this.setPlayerEnergyCallback(energy);
  }

  setEnemyEnergy(energy: number): void {
    this.setEnemyEnergyCallback(energy);
  }

  setHand(cards: ICard[]): void {
    this.setHandCallback(cards);
  }

  setDrawPileSize(size: number): void {
    this.setDrawPileSizeCallback(size);
  }

  setPlayerBufferCards(cardStates: (ICardState | null)[]): void {
    this.setPlayerBufferCardsCallback(cardStates);
  }

  setEnemyBufferCards(cardStates: (ICardState | null)[]): void {
    this.setEnemyBufferCardsCallback(cardStates);
  }

  setEnemyCards(cardStates: (ICardState | null)[]): void {
    this.setEnemyCardsCallback(cardStates);
  }

  setPlayerCards(cardStates: (ICardState | null)[]): void {
    this.setPlayerCardsCallback(cardStates);
  }
}

export default BattleStateObserver;
