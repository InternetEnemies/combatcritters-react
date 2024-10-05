export interface ICard {
  id: number;
  rarity: string;
  name: string;
  playCost: number;
  imagePath: string;
  abilities: number[];
  type: string;
  description: string;
  hp: number;
  damage: number;
  cardCount?: number;
}
