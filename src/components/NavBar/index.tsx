import React from "react";
import "./navBar.css";
import ProfileButton from "components/NavBar/components/ProfileButton";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate(); 

  const toCollection = () => {
    navigate("/collection");
  };

  return (
    <div className="navBarRoot">
      <button className="collectionButton" onClick={toCollection}>
        Go to Collection
      </button>
      <ProfileButton />
    </div>
  );
};

export default NavBar;
