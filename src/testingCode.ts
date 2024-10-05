import { ICard, ICardCritter, ICardItem } from "combatcritters-ts/src/objects";
import { ICardVisitor } from "combatcritters-ts/src/ICardVisitor";
import { IDeckDetails } from "deckDetails";
import { ISortableDeck } from "interfaces/ISortableDeck";


export function getCritterCards(): ICardCritter[] {
  const cards: ICardCritter[] = [];

  for (let i = 1; i <= 5; i++) {
    cards.push({
      cardid: i,
      rarity: 2,
      name: `UglyMan, the Hideous Hero`,
      playcost: i,
      abilities: [0, 1, 2],
      description: `Uglyman, once shunned for his grotesque appearance, now defends the weak with unmatched strength.`,
      health: 35,
      damage: 10,
      image: "2",
      accept(visitor: ICardVisitor): void {
          visitor.visitCritter(this);
      }
    });
  }

  return cards;
}

export function getItemCards(): ICardItem[] {
  const cards: ICardItem[] = [];

  for (let i = 1; i <= 10; i++) {
    cards.push({
      cardid: i,
      rarity: 2,
      name: `UglyMan, the Hideous Hero`,
      playcost: i,
      description: `Uglyman, once shunned for his grotesque appearance, now defends the weak with unmatched strength.`,
      image: "2",
      abilityid:0,
      accept(visitor: ICardVisitor): void {
        visitor.visitItem(this);
      },
    });
  }

  return cards;
}

export function getDeckDetailsList(): IDeckDetails[] {
  const deckDetailsList: IDeckDetails[] = []
  for (let i = 0; i < 10; i++) {
      deckDetailsList.push({id: i, name: `deck${i + 1}`})
  }
  return deckDetailsList
}

// export function getDeck(): IDeck {
//   const cards: ICard[] = getCards(); // Fetch cards as ICard[]

//   // Convert ICard[] to IDraggableCard[] by adding an instanceId
//   const draggableCards: IDraggableCard[] = cards.map((card) => ({
//     ...card,
//     instanceId: uuidv4(), // Generate a unique instanceId for each card
//   }));

//   return {
//     id: getDeckDetailsList()[0].id, // Use the first deck details
//     name: getDeckDetailsList()[0].name, // Use the first deck's name
//     cards: draggableCards, // Pass the transformed draggable cards
//   };
// }

export function getEmptyDeck(): ISortableDeck {
  return {
    id: getDeckDetailsList()[0].id,
    name: getDeckDetailsList()[0].name,
    cards: [],
  };
}
