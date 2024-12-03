import { IBattleClient, ICard, ICardState } from "combatcritters-ts";
// import { getBattleClient } from "../../BattleProvider";
import { IMatchStateObserver } from "combatcritters-ts";
import { useEffect, useState } from "react";
import { IBattleStateObserver } from "combatcritters-ts";
import { useBattleClient } from "contexts/BattleClientContext";

export const BattleTest = () => {
  // todo remove this later
//   let bclient: Promise<IBattleClient> = getBattleClient();
  const [title, setTitle] = useState("BattleTest");
  const [isTurn, setIsTurn] = useState(false);

  const { battleClient, refreshClient } = useBattleClient();

  class MatchObserver implements IMatchStateObserver {
    gameFound(opponent: string): void {
      setTitle(`found match with ${opponent}`);
    }
    matchEnded(type: string): void {
      
    }
  }

  let battleObsv: IBattleStateObserver = {
    setPlayerTurn: function (isPlayerTurn: boolean): void {
      setIsTurn(!isTurn);
    },
    setPlayerHealth: function (health: number): void {
      throw new Error("Function not implemented.");
    },
    setEnemyHealth: function (health: number): void {
      throw new Error("Function not implemented.");
    },
    setPlayerEnergy: function (energy: number): void {
      throw new Error("Function not implemented.");
    },
    setEnemyEnergy: function (energy: number): void {
      throw new Error("Function not implemented.");
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
    },
  };

  useEffect(() => {
    refreshClient();
  }, []);

  useEffect(() => {
     const setObserver = async () => {

       if (battleClient) {
         battleClient.setBattleStateObserver(battleObsv);
         console.log("herre");
       }
     };
     setObserver();
  },[battleClient])

  //   bclient.then((b) => {
  //     b.setBattleStateObserver(battleObsv);
  //   });

  const startmatch = async () => {
    if (battleClient) {
    
        (battleClient).matchController.match("pvp");
      

        (battleClient).setMatchStateObserver(new MatchObserver());
     
    }
    console.log(battleClient);
    // refreshClient();
  };

  const endTurn = async () => {
    if (battleClient) {
      (battleClient).battleController.endTurn();
    }
  };
  return (
    <div>
      <h1>{title}</h1>
      <h2>{isTurn ? "turn" : "notTurn"}</h2>
      <button onClick={startmatch}>Matchmake</button>
      <button onClick={endTurn}>end turn</button>
    </div>
  );
};
