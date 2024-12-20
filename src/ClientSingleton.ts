/**
 * @Created 2024-10-07
 * @Brief Singleton class for getting the client instance.
 */

import { Client } from "combatcritters-ts";
import { IClient } from "combatcritters-ts";

export class ClientSingleton {
  private static instance: IClient | undefined;
  public static mediaRoot: string = process.env.REACT_APP_MEDIA_ROOT ?? "https://combatcritters.s3.us-east-1.amazonaws.com"

  private constructor() {}

  public static getInstance(): IClient {
    if (!this.instance) {
      this.instance = Client.fromApi(process.env.REACT_APP_API ?? "http://api.combatcritters.ca:4000");
    }
    return this.instance;
  }
}
