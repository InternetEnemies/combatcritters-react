/**
 * @Created 2024-10-07
 * @Brief Component displaying a users list of friends. When a friend is clicked
 *         a popup appears displaying that friends featured deck.
 */

import React, { useEffect, useState } from "react";
import "./friends.css";
import FriendDeckPopup from "pages/Profile/components/FriendDeckPopup";
import { ICard, IDeck, IUser } from "combatcritters-ts";
import Popup from "components/Popup";
import { ClientSingleton } from "ClientSingleton";
import { toast } from "react-toastify";

interface FriendsProps {
  friends: IUser[];
  setFriends: (friends: IUser[]) => void;
}
const Friends: React.FC<FriendsProps> = ({ friends, setFriends }) => {
  const [selectedFriend, setSelectedFriend] = useState<IUser | null>(null);
  const [showDeck, setShowDeck] = useState(false);
  const [featuredDeck, setFeaturedDeck] = useState<IDeck | null>(null);
  const [featuredDeckCards, setFeaturedDeckCards] = useState<ICard[] | null>(
    null
  );

  const onFriendClick = (user: IUser) => {
    setSelectedFriend(user);
  };

  /**
   * On mount, fetch the user's friends
   */
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const f = await ClientSingleton.getInstance().user.friends.getFriends();
        setFriends(f);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
    // eslint-disable-next-line
  }, []);

  /**
   * On selectedFriend change, fetch and set the user's featuredDeck and the user's featuredDeckCards.
   */
  useEffect(() => {
    if (selectedFriend) {
      const setDeckAndCards = async () => {
        try {
          const featuredD = await selectedFriend.profile.getDeck();
          setFeaturedDeck(featuredD);

          if (featuredD) {
            const cards = await featuredD.getCards();
            setFeaturedDeckCards(cards);
          }
        } catch (error) {
          toast(selectedFriend.username + " has no Featured Deck");
          console.error("Error during profile fetch:" + error);
        }
      };
      setDeckAndCards();
    }
  }, [selectedFriend]);

  /**
   * On featuredDeckCards change, display the featured deck. When featuredDeckCards is !null
   * the popup will be displayed.
   */
  useEffect(() => {
    if (featuredDeckCards) {
      setShowDeck(true);
    }
  }, [featuredDeckCards]);

  const handlePopupClose = () => {
    setSelectedFriend(null);
    setFeaturedDeck(null);
    setFeaturedDeckCards(null);
  };

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
      {
        <Popup
          popupContent={
            <FriendDeckPopup
              friend={selectedFriend}
              deck={featuredDeck}
              deckCards={featuredDeckCards}
            />
          }
          isVisible={showDeck}
          setIsVisible={setShowDeck}
          onClose={handlePopupClose}
        />
      }
    </div>
  );
};

export default Friends;
