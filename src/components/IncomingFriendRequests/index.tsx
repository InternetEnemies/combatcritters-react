/**
 * @Created 2024-10-07
 * @Brief Component for accepting incoming friend requests.
 */

import React from "react";
import "./incomingFriendRequests.css";
import { useManageFriendRequests } from "hooks/useManageFriendRequests";
import checkmark from "assets/icons/checkmark.svg";
import { IUser } from "combatcritters-ts";

interface FriendsProps {
  friends: IUser[];
  setFriends: (friends: IUser[]) => void;
}
const IncomingFriendRequests: React.FC<FriendsProps> = ({friends, setFriends}) => {
  const { friendRequests, acceptFriendRequest } =
    useManageFriendRequests(friends, setFriends);

  return (
    <div className="friendRequestsRoot">
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
