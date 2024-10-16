/**
 * @Created 2024-10-07
 * @Brief Component allowing users to send friend requests.
 */

import React, { useState } from "react";
import "./sendFriendRequest.css";
import { ClientSingleton } from "ClientSingleton";
import sendButton from "assets/icons/send.svg";

const SendFriendRequest: React.FC = () => {
  const [username, setUsername] = useState<string>("");

  const handleSendRequest = () => {
    try {
      ClientSingleton.getInstance().user.friends.addFriend(username);
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
      <img className="sendButton" src={sendButton} alt="Send Button" onClick={handleSendRequest}/>
    </div>
  );
};

export default SendFriendRequest;
