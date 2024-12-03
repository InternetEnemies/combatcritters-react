import {IBattleClient, BattleClient} from "combatcritters-ts";

const battleRoot:string = process.env.REACT_APP_SOCKET ?? "ws://api.combatcritters.ca:4000/ws"

// export async function getBattleClient():Promise<IBattleClient> {
//     return BattleClient.getClient(battleRoot)
// }