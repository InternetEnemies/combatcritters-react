import React from "react";
import "./navBar.css";
import ProfileButton from "components/NavBar/components/ProfileButton";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  numberOfRequests: number;
  setNumberOfRequests: (num: number) => void;
}
const NavBar: React.FC<NavbarProps> = ({numberOfRequests, setNumberOfRequests}) => {
  const navigate = useNavigate(); 

  const toCollection = () => {
    navigate("/collection");
  };

  return (
    <div className="navBarRoot">
      <button className="collectionButton" onClick={toCollection}>
        Go to Collection
      </button>
      <ProfileButton numberOfRequests={numberOfRequests} setNumberOfRequests={setNumberOfRequests}/>
    </div>
  );
};

export default NavBar;
