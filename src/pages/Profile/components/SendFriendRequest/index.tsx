/**
 * @Created 2024-10-07
 * @Brief Component allowing users to send friend requests.
 */

import React, { useState } from "react";
import "./sendFriendRequest.css";
import { ClientSingleton } from "ClientSingleton";
import sendButton from "assets/icons/send.svg";
import { toast } from "react-toastify";

const SendFriendRequest: React.FC = () => {
  const [username, setUsername] = useState<string>("");

  const handleSendRequest = () => {
    try {
      setUsername(username.trim());
      if (username === "") {
        toast.error("Invalid Username")
      } else {
        ClientSingleton.getInstance().user.friends.addFriend(username);
        toast.success("Friend Request Sent!");
      }
    } catch (error) {
      console.error("Error sending friend request:" + error);
    }
  };

  return (
    <div className="sendFriendRequestContainer">
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
    </div>
  );
};

export default SendFriendRequest;
