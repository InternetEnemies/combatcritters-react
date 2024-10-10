import React, { useState, useRef, useEffect } from "react";
import "./profileButton.css";
import profileIcon from "assets/icons/profile.svg";
import ProfilePopdown from "components/ProfilePopdown";
import { useMonitorFriendRequests } from "components/NavBar/hooks/useMonitorFriendRequests";

const ProfileButton: React.FC = () => {
  const [isPopdownVisible, setIsPopdownVisible] = useState(false);
  const popdownRef = useRef<HTMLDivElement>(null);
  const numberOfRequests = useMonitorFriendRequests();

  const togglePopdown = () => {
    setIsPopdownVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popdownRef.current &&
        !popdownRef.current.contains(event.target as Node)
      ) {
        setIsPopdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="profileButtonContainer" ref={popdownRef}>
      <button className="profileButton" onClick={togglePopdown}>
        <div className="profileIconContainer">
          <img src={profileIcon} alt="Profile Icon" className="svgIcon" />
          {numberOfRequests > 0 && (
            <span className="notificationBadge">{numberOfRequests}</span>
          )}
        </div>
      </button>

      <ProfilePopdown isVisible={isPopdownVisible} />
    </div>
  );
};

export default ProfileButton;
