/**
 * @Created 2024-10-28
 * @Brief Global battle client context.
 */

import { BattleClient, IBattleClient } from "combatcritters-ts";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface BattleClientType {
  battleClient: IBattleClient | null;
  refreshClient: () => void;
}

const BattleClientContext = createContext<BattleClientType | undefined>(
  undefined
);

export const BattleClientProvider = ({ children }: { children: ReactNode }) => {
  const battleRoot: string =
    process.env.REACT_APP_SOCKET ?? "ws://api.combatcritters.ca:4000/ws";

  const [battleClient, setBattleClient] = useState<IBattleClient | null>(null);

  const refreshClient = async () => {
    const refresh = async () => {
      try {
        const bClient = await BattleClient.getClient(battleRoot);
        setBattleClient(bClient);
        console.log("Refreshing client");
      } catch (error) {
        console.error("Failed to refresh battle client:" + error);
      }
    };
    refresh();
  };


  return (
    <BattleClientContext.Provider
      value={{ battleClient, refreshClient  }}
    >
      {children}
    </BattleClientContext.Provider>
  );
};

export const useBattleClient = (): BattleClientType => {
  const context = useContext(BattleClientContext);
  if (context === undefined) {
    throw new Error("useBattleClient must be used within a CurrencyProvider");
  }
  return context;
};
