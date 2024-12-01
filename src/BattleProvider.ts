import {IBattleClient, BattleClient} from "combatcritters-ts";

const battleRoot:string = process.env.REACT_APP_SOCKET ?? "ws://combatcritters.ca/ws"

export async function getBattleClient():Promise<IBattleClient> {
    return BattleClient.getClient(battleRoot)
}