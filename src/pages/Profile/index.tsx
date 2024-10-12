import React from "react";
import NavBar from "components/NavBar";
import "./profile.css";
import FeatureDeck from "pages/Profile/components/FeatureDeck";
import IncomingFriendRequests from "pages/Profile/components/IncomingFriendRequests";
import SendFriendRequest from "pages/Profile/components/SendFriendRequest";
import Friends from "pages/Profile/components/Friends";
import { useState } from "react";
import { IUser } from "combatcritters-ts";

interface ProfileProps {
  numberOfRequests: number;
  setNumberOfRequests: (num: number) => void;
}

const Profile: React.FC<ProfileProps> = ({
  numberOfRequests,
  setNumberOfRequests,
}) => {
  const [friends, setFriends] = useState<IUser[]>([]);

  return (
    <div className="profileRoot">
      <div className="profileContainer">
        <FeatureDeck />
        <div className="friendsContainer">
          <Friends friends={friends} setFriends={setFriends} />
          <IncomingFriendRequests
            friends={friends}
            setFriends={setFriends}
            numberOfRequests={numberOfRequests}
            setNumberOfRequests={setNumberOfRequests}
          />
          <SendFriendRequest />
        </div>
      </div>
    </div>
  );
};

export default Profile;
