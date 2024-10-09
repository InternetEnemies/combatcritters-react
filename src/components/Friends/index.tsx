/**
 * @Created 2024-10-07
 * @Brief Component displaying a users list of friends. When a friend is clicked
 *         a popup appears displaying that friends featured deck.
 */

import React from "react";
import "./friends.css";
import { useFriendsList } from "hooks/useFriendsList";
import FriendDeckPopup from "components/FriendDeck";

const Friends: React.FC = ({}) => {
  const { friends, selectedFriend, showDeck, setShowDeck, onFriendClick } =
    useFriendsList();
  return (
    <div className="friendsListContainer">
      <h3 className="friendsTitle">Your Friends</h3>
      <ul className="friendsList">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <li
              key={friend.id}
              className="friendItem"
              onClick={() => onFriendClick(friend)}
            >
              {friend.username}
            </li>
          ))
        ) : (
          <p>You have no friends yet.</p>
        )}
      </ul>
      <FriendDeckPopup
        user={selectedFriend}
        isVisible={showDeck}
        setVisibility={setShowDeck}
      />
    </div>
  );
};

export default Friends;
