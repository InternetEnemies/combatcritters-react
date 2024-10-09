import React from "react";
import "./profilePopdown.css";

interface PopdownProps {
  isVisible: boolean;
}

const ProfilePopdown: React.FC<PopdownProps> = ({ isVisible }) => {

  const handleProfileClick = () => {
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
