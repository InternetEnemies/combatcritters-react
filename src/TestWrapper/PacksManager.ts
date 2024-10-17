import { IPack } from "combatcritters-ts";
import { IPacksManager } from "combatcritters-ts";
import { Pack } from "./Pack";

export class PacksManager implements IPacksManager {

  public async getPacks(): Promise<IPack[]> {
    const packs: IPack[] = [];
    for(let i = 0; i < 20; i++) {
        packs[i] = new Pack("/assets/images/pack.png", "Into the Robverse", 0);
    }
    return packs;
  }
}
