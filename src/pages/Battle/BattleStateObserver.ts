/**
 * @Created 2024-11-27
 * @Brief Implementation of IBattleStateObserver to be passed to the wrapper.
 */

import { ICard } from "combatcritters-ts";
import { IBattleStateObserver } from "combatcritters-ts";
import { ICardState } from "combatcritters-ts";

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
