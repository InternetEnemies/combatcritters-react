/**
 * @Created 2024-10-07
 * @Brief Component allowing users to send friend requests.
 */

import React, { useState } from "react";
import "./sendFriendRequest.css";
import { ClientSingleton } from "ClientSingleton";

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
    <div className="sendFriendRequestContainer">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Send Friend Request"
        className="friendRequestInput"
      />
      <button onClick={handleSendRequest} className="sendRequestButton">
        Send
      </button>
    </div>
  );
};

export default SendFriendRequest;
