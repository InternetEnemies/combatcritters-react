import React from "react";
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
      <div className="featureDeckWrapper">
        <FeatureDeck />
      </div>

      <div className="friendsContainer">
        <div className="friendsWrapper">
          <Friends friends={friends} setFriends={setFriends} />
        </div>
        <div className="incomingFriendRequestsWrapper">
          <IncomingFriendRequests
            friends={friends}
            setFriends={setFriends}
            numberOfRequests={numberOfRequests}
            setNumberOfRequests={setNumberOfRequests}
          />
        </div>
        <div className="sendFriendRequestWrapper">
          <SendFriendRequest />
        </div>
      </div>
    </div>
  );
};

export default Profile;
