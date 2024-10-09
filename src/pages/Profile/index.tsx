import React from "react";
import NavBar from "components/NavBar";
import "./profile.css";
import FeatureDeck from "components/FeatureDeck";
import IncomingFriendRequests from "components/IncomingFriendRequests";
import SendFriendRequest from "components/SendFriendRequest";
import Friends from "components/Friends";

const Profile: React.FC = () => {

  return (
    <div className="profileRoot">
      <NavBar />
      <div className="profileContainer">
        <FeatureDeck />
        <div className="friendsContainer">
          <Friends/>
          <IncomingFriendRequests />
          <SendFriendRequest/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
