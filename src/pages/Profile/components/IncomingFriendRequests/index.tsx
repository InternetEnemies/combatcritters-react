/**
 * @Created 2024-10-07
 * @Brief Component for accepting incoming friend requests.
 */

import React from "react";
import "./incomingFriendRequests.css";
import { useManageFriendRequests } from "pages/Profile/hooks/useManageFriendRequests";
import checkmark from "assets/icons/checkmark.svg";
import { IUser } from "combatcritters-ts";
import { useToast } from "hooks/useToast";
import Toast from "components/Toast";

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
  setNumberOfRequests,
}) => {
  const { showToast, setShowToast, triggerToast, toastMessage } = useToast();

  const { friendRequests, acceptFriendRequest } = useManageFriendRequests(
    friends,
    setFriends,
    numberOfRequests,
    setNumberOfRequests,
    triggerToast
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
      <Toast show={showToast} setShow={setShowToast} message={toastMessage} />
    </div>
  );
};

export default IncomingFriendRequests;
