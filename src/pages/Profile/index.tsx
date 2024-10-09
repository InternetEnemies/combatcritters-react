import React from "react";
import NavBar from "components/NavBar";
import "./profile.css";
import FeatureDeck from "components/FeatureDeck";
import IncomingFriendRequests from "components/IncomingFriendRequests";
import SendFriendRequest from "components/SendFriendRequest";
import Friends from "components/Friends";
import { useState } from "react";
import { IUser } from "combatcritters-ts";

const Profile: React.FC = () => {

  const [friends, setFriends] = useState<IUser[]>([]);

  return (
    <div className="profileRoot">
      <NavBar />
      <div className="profileContainer">
        <FeatureDeck />
        <div className="friendsContainer">
          <Friends friends={friends} setFriends={setFriends}/>
          <IncomingFriendRequests friends={friends} setFriends={setFriends}/>
          <SendFriendRequest/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
