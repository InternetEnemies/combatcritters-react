import React, { useState } from "react";
import "./navBar.css";
import ProfileButton from "components/ProfileButton"; 

const NavBar: React.FC = () => {
  const [hasNotifications, setHasNotifications] = useState(true); 
  const notificationCount = 3; 

  return (
    <div className="navBarRoot">
      <ProfileButton
        hasNotifications={hasNotifications}
        notificationCount={notificationCount}
      />
    </div>
  );
};

export default NavBar;
