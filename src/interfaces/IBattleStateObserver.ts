//TODO remove this

import { ICard } from "combatcritters-ts";
import { ICardState } from "./ICardState";

export interface IBattleStateObserver {
  setPlayerTurn(isPlayerTurn: boolean): void;

  setPlayerHealth(health: number): void;

  setEnemyHealth(health: number): void;

  setPlayerEnergy(energy: number): void;

  setEnemyEnergy(energy: number): void;

  setHand(cards: ICard[]): void;

  setDrawPileSize(size: number): void;

  setPlayerBufferCards(cardStates: (ICardState | null)[]): void;

  setEnemyBuffercards(cardStates: (ICardState | null)[]): void;

  setEnemyCards(cardStates: (ICardState | null)[]): void;

  setPlayerCards(cardStates: (ICardState | null)[]): void;
}