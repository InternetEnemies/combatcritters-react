/**
 * @Created 2024-10-28
 * @Brief Global battle client context.
 */

import {
  BattleClient,
  IBattleClient,
  IItem,
  IItemStack,
  IMatchStateObserver,
} from "combatcritters-ts";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { useBattleState } from "./BattleStateContext";
import { ClientSingleton } from "ClientSingleton";

interface BattleClientType {
  battleClient: IBattleClient | null;
  fetchBattleClient: () => void;
}

const BattleClientContext = createContext<BattleClientType | undefined>(
  undefined
);

export const BattleClientProvider = ({ children }: { children: ReactNode }) => {
  const BATTLE_ROOT: string =
    process.env.REACT_APP_SOCKET ?? "ws://api.combatcritters.ca:4000/ws";

  const [battleClient, setBattleClient] = useState<IBattleClient | null>(null);
  const { battleStateObserver, setRewards, setType } = useBattleState();

  const navigate = useNavigate();

  /**
   * Get a new battle client
   */
  const fetchBattleClient = async () => {
    const refresh = async () => {
      try {
        const bClient = await BattleClient.getClient(
          BATTLE_ROOT,
          ClientSingleton.getInstance().rest
        );
        setBattleClient(bClient);
      } catch (error) {
        console.error("Failed to fetch battle client:" + error);
      }
    };
    refresh();
  };

  /**
   * Initialize the client once ready
   */
  useEffect(() => {
    const initialize = async () => {
      try {
        battleClient?.setBattleStateObserver(battleStateObserver);
        battleClient?.setMatchStateObserver(new MatchObserver());
      } catch (error) {
        console.error("Failed to initialize battle client:" + error);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleClient]);

  /**
   * The match observer attached to the battle client
   */
  class MatchObserver implements IMatchStateObserver {
    gameFound(opponent: string): void {
      console.log("Game found against " + opponent);
      navigate("/battle");
    }
    matchEnded(type: string, rewards: IItemStack<IItem>[]): void {
      console.log("Match Ended");
      setRewards(rewards);
      setType(type);
      navigate("/battle-rewards");
    }
  }

  return (
    <BattleClientContext.Provider value={{ battleClient, fetchBattleClient }}>
      {children}
    </BattleClientContext.Provider>
  );
};

export const useBattleClient = (): BattleClientType => {
  const context = useContext(BattleClientContext);
  if (context === undefined) {
    throw new Error(
      "useBattleClient must be used within a BattleClientProvider"
    );
  }
  return context;
};
