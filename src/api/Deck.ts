import { ICard } from "combatcritters-ts/src/objects";
import { IDeck

 } from "combatcritters-ts/src/objects";
class Deck implements IDeck {
  deckid: number;
  name: string;
  cards: ICard[] = [];

  constructor(deckid: number, name: string) {
    this.deckid = deckid;
    this.name = name;
  }

  async addCard(card: ICard, position: number): Promise<DeckValidity> {
    if (position < 0 || position > this.cards.length) {
      return {
        isValid: false,
        issues: ["Invalid position"],
      };
    }
    this.cards.splice(position, 0, card);
    return this.getValidity();
  }

  async removeCard(position: number): Promise<DeckValidity> {
    if (position < 0 || position >= this.cards.length) {
      return {
        isValid: false,
        issues: ["Invalid position"],
      };
    }
    this.cards.splice(position, 1);
    return this.getValidity();
  }

  async delete(): Promise<void> {
    this.cards = [];
  }

  async getValidity(): Promise<DeckValidity> {
    if (this.cards.length === 0) {
      return {
        isValid: false,
        issues: ["Deck is empty"],
      };
    }

    // You can add additional rules for validation here
    return {
      isValid: true,
    };
  }
}

export type DeckValidity = {
  isValid: boolean;
  issues?: string[];
};

export default Deck;
