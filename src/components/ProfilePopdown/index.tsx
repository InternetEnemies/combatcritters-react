import React from "react";
import "./profilePopdown.css";
import { useNavigate } from "react-router-dom";

interface PopdownProps {
  isVisible: boolean;
}

const ProfilePopdown: React.FC<PopdownProps> = ({ isVisible }) => {

  const handleProfileClick = () => {
   navigate("/profile");
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
