import { IDeckManager } from "combatcritters-ts/src/managers";
import { IDeck } from "combatcritters-ts/src/objects";
import Deck from "./Deck";
import { DeckRules } from "combatcritters-ts/src/rest/payloads";

class DeckManager implements IDeckManager {
  private static instance: DeckManager;
  private decks: IDeck[] = [];

  private constructor() {
  }

  public static getInstance(): DeckManager {
    if (!DeckManager.instance) {
      DeckManager.instance = new DeckManager();
    }
    return DeckManager.instance;
  }

  
  async getDecks(): Promise<IDeck[]> {
    return this.decks;
  }

  async createDeck(deckName: string): Promise<IDeck> {
    const newDeck = new Deck(this.decks.length + 1, deckName); 
    this.decks.push(newDeck);
    return newDeck;
  }

  async deleteDeck(deck: IDeck): Promise<void> {
    return;
  }

  async getDeckRules(): Promise<DeckRules | null> {
    return null;
  }
}

export default DeckManager;
