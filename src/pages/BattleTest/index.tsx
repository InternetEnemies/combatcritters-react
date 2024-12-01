import {IBattleClient} from "combatcritters-ts";
import {getBattleClient} from "../../BattleProvider";
import {IMatchStateObserver} from "combatcritters-ts";
import {useState} from "react";

export const BattleTest = () => {
    // todo remove this later
    let bclient:IBattleClient
    const [title, setTitle] = useState("BattleTest");

    class MatchObserver implements IMatchStateObserver {
        gameFound(opponent: string): void {
            setTitle(`found match with ${opponent}`);
        }
    }
    const startmatch = async () => {
        bclient = await getBattleClient()
        bclient.matchController.match("pvp")
        bclient.setMatchStateObserver(new MatchObserver())
    }
    return (
        <div>
            <h1>{title}</h1>
            <button onClick={startmatch}>Matchmake</button>
        </div>
    )
}
