/**
 * @Created 2024-10-28
 * @Brief The Nav Bar...
 */

import React from "react";
import "./navBar.css";
import ProfileButton from "components/NavBar/components/ProfileButton";
import { useNavigate } from "react-router-dom";
import CurrencyComp from "components/CurrencyComp";
import { useCurrency } from "contexts/CurrencyContext";

interface NavbarProps {
  numberOfRequests: number;
  setNumberOfRequests: (num: number) => void;
}
const NavBar: React.FC<NavbarProps> = ({
  numberOfRequests,
  setNumberOfRequests,
}) => {
  const SCALE_CURRENCY = 1.15;
  const navigate = useNavigate();
  const { userCurrencyAmount } = useCurrency();

  const toCollection = () => {
    navigate("/collection");
  };

  const toPacks = () => {
    navigate("/packs");
  };

  const toVendors = () => {
    navigate("/vendors");
  };
  
  const toBattle = () => {
    navigate("/battle");
  }

  return (
    <div className="navBarRoot">
      <div className="navButtonsContainer">
        <span className="navButton" onClick={toBattle}>Battle</span>
        <span className="navButton" onClick={toCollection}>
          Deck Builder
        </span>
        <span className="navButton" onClick={toPacks}>
          Packs
        </span>
        <span className="navButton" onClick={toVendors}>
          Vendors
        </span>
      </div>

      <div className="currencyAndProfileContainer">
        <CurrencyComp
          amount={userCurrencyAmount}
          style={{ color: "var(--custom-white)" }}
          scale={SCALE_CURRENCY}
        />

        <div className="divider"></div>

        <ProfileButton
          numberOfRequests={numberOfRequests}
          setNumberOfRequests={setNumberOfRequests}
        />
      </div>
    </div>
  );
};

export default NavBar;
