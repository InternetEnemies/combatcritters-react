import { ClientSingleton } from "ClientSingleton";
import { ICard } from "combatcritters-ts";
import { IPack } from "combatcritters-ts";

export class Pack implements IPack {
  private readonly _image: string;
  private readonly _name: string;
  private readonly _packid: number;



  constructor(image: string, name: string, packid: number) {
    this._image = image;
    this._name = name;
    this._packid = packid;
  }

  public async getSetList(): Promise<ICard[]> {
    const builder = ClientSingleton.getInstance().user.cards.getBuilder();
    builder.setRarities([3]);
    builder.setRaritiesInclude(true);
    const cardQuery = builder.build()
    return(await ClientSingleton.getInstance().cards.getCards(cardQuery));
  }

  public async open(): Promise<ICard[]> {
    throw new Error("Method not implemented.");
  }

  public get image(): string {
    return this._image;
  }

  public get name(): string {
    return this._name;
  }

  public get packid(): number {
    return this._packid;
  }
}
