import React from "react";
import "./navBar.css";
import ProfileButton from "components/NavBar/components/ProfileButton";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  numberOfRequests: number;
  setNumberOfRequests: (num: number) => void;
}
const NavBar: React.FC<NavbarProps> = ({
  numberOfRequests,
  setNumberOfRequests,
}) => {
  const navigate = useNavigate();

  const toCollection = () => {
    navigate("/collection");
  };

  const toPacks = () => {
    navigate("/packs");
  }

  return (
    <div className="navBarRoot">
      <div className="navButtonsContainer">
        <span className="navButton">Home</span>
        <span className="navButton" onClick={toCollection}>
          Deck Builder
        </span>
        <span className="navButton" onClick={toPacks}>
          Packs
        </span>
      </div>
      <ProfileButton
        numberOfRequests={numberOfRequests}
        setNumberOfRequests={setNumberOfRequests}
      />
    </div>
  );
};

export default NavBar;
