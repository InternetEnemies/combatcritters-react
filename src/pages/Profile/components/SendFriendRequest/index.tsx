/**
 * @Created 2024-10-07
 * @Brief Component allowing users to send friend requests.
 */

import React, { useState } from "react";
import "./sendFriendRequest.css";
import { ClientSingleton } from "ClientSingleton";
import sendButton from "assets/icons/send.svg";
import { useToast } from "hooks/useToast";
import Toast from "components/Toast";

const SendFriendRequest: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const { showToast, setShowToast, triggerToast, toastMessage } = useToast();

  const handleSendRequest = () => {
    try {
      setUsername(username.trim());
      if (username === "") {
        triggerToast("Invalid Username");
      } else {
        ClientSingleton.getInstance().user.friends.addFriend(username);
        triggerToast("Friend Request Sent!");
      }
    } catch (error) {
      console.error("Error sending friend request:" + error);
    }
  };

  return (
    <div className="sendFriendRequestContainer sharedFriendStyles">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Send Friend Request"
        className="friendRequestInput"
      />
      <img
        className="sendButton"
        src={sendButton}
        alt="Send Button"
        onClick={handleSendRequest}
      />
      <Toast show={showToast} setShow={setShowToast} message={toastMessage} />
    </div>
  );
};

export default SendFriendRequest;
