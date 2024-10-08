import React from "react";
import "./profilePopdown.css";
import { useNavigate } from "react-router-dom";
import logoutIcon from "assets/icons/logout.svg"; 

interface PopdownProps {
  isVisible: boolean;
}

const ProfilePopdown: React.FC<PopdownProps> = ({ isVisible }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
   //todo navigate("/profile");
  };

  const handleLogoutClick = () => {
    navigate("/login");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="profilePopdownRoot">
      <button className="popdownButton" onClick={handleProfileClick}>
        Your Profile
      </button>
    </div>
  );
};

export default ProfilePopdown;
