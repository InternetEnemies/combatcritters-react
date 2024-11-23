/**
 * @Created 2024-10-28
 * @Brief Global currency context.
 */

import { ClientSingleton } from "ClientSingleton";
import { Currency, ICurrency } from "combatcritters-ts";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CurrencyContextType {
  userCurrency: ICurrency;
  updateCurrency: () => Promise<void>;
  handleTransaction: (transactionFunc: () => Promise<void>) => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [userCurrency, setUserCurrencyAmount] = useState<ICurrency>(
    new Currency(0)
  );

  /*
    Update the currency based on what's in the backend
   */
  const updateCurrency = async () => {
    try {
      const fetchedCurrency =
        await ClientSingleton.getInstance().user.currency.getCurrency();
      setUserCurrencyAmount(fetchedCurrency);
    } catch (error) {
      console.error("Error fetching currency:", error);
    }
  };

  /**
   * Use this function whenever making some change to the user's currency in the backend.
   * @param transactionFunc function that updates user's currency in the backend.
   */
  const handleTransaction = async (transactionFunc: () => Promise<void>) => {
    await transactionFunc(); // Execute transaction logic
    await updateCurrency(); // Fetch latest currency after transaction
  };

  return (
    <CurrencyContext.Provider
      value={{ userCurrency, updateCurrency, handleTransaction }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
