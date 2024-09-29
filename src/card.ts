export interface Card {
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
}
