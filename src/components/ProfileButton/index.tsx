import React, { useState, useRef, useEffect } from "react";
import "./profileButton.css";
import profileIcon from "assets/icons/profile.svg";
import ProfilePopdown from "components/ProfilePopdown";

interface ProfileButtonProps {
  hasNotifications: boolean;
  notificationCount?: number;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  hasNotifications,
  notificationCount = 0,
}) => {
  const [isPopdownVisible, setIsPopdownVisible] = useState(false);
  const popdownRef = useRef<HTMLDivElement>(null);

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
          {hasNotifications && (
            <span className="notificationBadge">
              {notificationCount > 0 ? notificationCount : ""}
            </span>
          )}
        </div>
      </button>

      <ProfilePopdown isVisible={isPopdownVisible} />
    </div>
  );
};

export default ProfileButton;
