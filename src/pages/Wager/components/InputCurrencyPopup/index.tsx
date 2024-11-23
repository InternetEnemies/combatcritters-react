/**
 * @Created 2024-11-18
 * @Brief The currency input popup for the wagering page.
 */
import React, { useState } from "react";
import "./inputCurrencyPopup.css";
import { Currency, ICurrency } from "combatcritters-ts";
import Button from "components/Button";
import { useCurrency } from "contexts/CurrencyContext";
import { toast } from "react-toastify";

interface InputCurrencyPopupProps {
  inventoryCurrency: ICurrency;
  setInventoryCurrency: (currency: ICurrency) => void;
  wageredCurrency: ICurrency | null;
  setWageredCurrency: (currency: ICurrency) => void;
  setPopupVisible: (visible: boolean) => void;
  setReady: (ready: boolean) => void;
}

const InputCurrencyPopup: React.FC<InputCurrencyPopupProps> = ({
  inventoryCurrency,
  setInventoryCurrency,
  wageredCurrency,
  setWageredCurrency,
  setPopupVisible,
  setReady,
}) => {
  const [inputAmount, setInputAmount] = useState<number | null>(null);

  /**
   * Handles input changes
   *
   * @param e - The change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseInt(e.target.value, 10);
    setInputAmount(isNaN(numericValue) ? null : numericValue);
  };

  /**
   * Handle submit button click.
   */
  const handleSubmit = () => {
    if (!inputAmount) {
      return;
    }

    if (inputAmount <= 0) {
      toast("Wagered currency must be greater than 0", {
        toastId: "negativeWager",
      });
      return;
    }

    if (inputAmount > inventoryCurrency.coins) {
      toast("Cannot exceed available currency", {
        toastId: "tooMuchCurrency",
      });
    }

    setInventoryCurrency(new Currency(inventoryCurrency.coins - inputAmount));
    setWageredCurrency(
      new Currency(inputAmount + (wageredCurrency?.coins ?? 0))
    );
    setPopupVisible(false);
  };

  return (
    <div className="inputCurrencyPopupRoot">
      <div className="inputCurrencyPopupContainer">
        <div className="availableCurrencyInfo">
          Available currency: {inventoryCurrency.coins}
        </div>
        <input
          type="number"
          value={inputAmount === null ? "" : inputAmount}
          onChange={handleChange}
          placeholder="Enter amount to wager"
          className="currencyInputField"
        />

        <Button text="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default InputCurrencyPopup;
