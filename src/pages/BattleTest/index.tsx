import {IBattleClient, ICard, ICardState} from "combatcritters-ts";
import {getBattleClient} from "../../BattleProvider";
import {IMatchStateObserver} from "combatcritters-ts";
import {useEffect, useState} from "react";
import {IBattleStateObserver} from "combatcritters-ts";

export const BattleTest = () => {
    // todo remove this later
    const bclient = getBattleClient()
    const [title, setTitle] = useState("BattleTest");
    const [isTurn, setIsTurn] = useState(false);

    class MatchObserver implements IMatchStateObserver {
        matchEnded(): void {
            setTitle("game ended")
        }
        gameFound(opponent: string): void {
            setTitle(`found match with ${opponent}`);
        }
    }

    let battleObsv: IBattleStateObserver = {
        setPlayerTurn: function (isPlayerTurn: boolean): void {
            setIsTurn(!isTurn);
        },
        setPlayerHealth: function (health: number): void {
            console.log("phealth",health)
        },
        setEnemyHealth: function (health: number): void {
            console.log("ehealth",health)
        },
        setPlayerEnergy: function (energy: number): void {
            console.log("penergy",energy)
        },
        setEnemyEnergy: function (energy: number): void {
            console.log("eenergy",energy)
        },
        setHand: function (cards: ICard[]): void {
            throw new Error("Function not implemented.");
        },
        setDrawPileSize: function (size: number): void {
            throw new Error("Function not implemented.");
        },
        setPlayerBufferCards: function (cardStates: (ICardState | null)[]): void {
            throw new Error("Function not implemented.");
        },
        setEnemyBufferCards: function (cardStates: (ICardState | null)[]): void {
            throw new Error("Function not implemented.");
        },
        setEnemyCards: function (cardStates: (ICardState | null)[]): void {
            throw new Error("Function not implemented.");
        },
        setPlayerCards: function (cardStates: (ICardState | null)[]): void {
            throw new Error("Function not implemented.");
        }
    }
    bclient.then((b) => {
        b.setBattleStateObserver(battleObsv)
        b.setMatchStateObserver(new MatchObserver())
        b.onStopped(() => { // create new battle client on close
        })
        console.log(bclient)
        console.log(b)
    })
    console.log(bclient)

    const startmatch = async () => {
        (await bclient).matchController.match("pvp");
    }
    const endTurn = async () => {
        (await bclient).battleController.endTurn();
    }
    const quitGame = async () => {
        (await bclient).matchController.cancelMatch();
    }
    return (
        <div>
            <h1>{title}</h1>
            <h2>{isTurn? "turn":"notTurn"}</h2>
            <button onClick={startmatch}>Matchmake</button>
            <button onClick={endTurn}>end turn</button>
            <button onClick={quitGame}>end game</button>
        </div>
    )
}
