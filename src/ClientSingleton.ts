import { Client } from "combatcritters-ts";
import { IClient } from "combatcritters-ts";

export class ClientSingleton {
  private static instance: IClient | undefined;

  private constructor() {}

  public static getInstance(): IClient {
    if (!this.instance) {
      this.instance = Client.fromApi("http://api.combatcritters.ca:4000");
    }
    return this.instance;
  }
}
