/**
 * @Created 2024-10-07
 * @Brief Hook that fetches a user's list of friends.
 */

import { ClientSingleton } from "ClientSingleton";
import { IUser } from "combatcritters-ts";
import { useEffect, useState } from "react";

export const useFriendsList = (
  friends: IUser[],
  setFriends: (friends: IUser[]) => void
) => {
  const [selectedFriend, setSelectedFriend] = useState<IUser | null>(null);
  const [showDeck, setShowDeck] = useState(false);

  const onFriendClick = (user: IUser) => {
    setShowDeck(true);
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

  return { friends, selectedFriend, setSelectedFriend, showDeck, setShowDeck, onFriendClick };
};
