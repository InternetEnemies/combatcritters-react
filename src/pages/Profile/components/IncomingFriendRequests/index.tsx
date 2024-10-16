/**
 * @Created 2024-10-07
 * @Brief Component for accepting incoming friend requests.
 */

import React from "react";
import "./incomingFriendRequests.css";
import { useManageFriendRequests } from "pages/Profile/hooks/useManageFriendRequests";
import checkmark from "assets/icons/checkmark.svg";
import { IUser } from "combatcritters-ts";

interface FriendsProps {
  friends: IUser[];
  setFriends: (friends: IUser[]) => void;
  numberOfRequests: number;
  setNumberOfRequests: (num: number) => void;
}
const IncomingFriendRequests: React.FC<FriendsProps> = ({
  friends,
  setFriends,
  numberOfRequests,
  setNumberOfRequests
}) => {
  const { friendRequests, acceptFriendRequest } = useManageFriendRequests(
    friends,
    setFriends,
    numberOfRequests, 
    setNumberOfRequests
  );

  return (
    <div className="friendRequestsRoot sharedFriendStyles">
      <h3>Incoming Friend Requests</h3>
      {friendRequests.length > 0 ? (
        <ul className="friendRequestsList">
          {friendRequests.map((user) => (
            <li key={user.id} className="friendRequestItem">
              <span>{user.username}</span>
              <div className="actionButtons">
                <button
                  className="iconButton acceptButton"
                  onClick={() => acceptFriendRequest(user)}
                >
                  <img src={checkmark} alt="Accept" className="acceptIcon" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No incoming friend requests</p>
      )}
    </div>
  );
};

export default IncomingFriendRequests;
