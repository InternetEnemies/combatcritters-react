/**
 * @Created 2024-10-07
 * @Brief Hook that fetches a user's list of friends.
 */

import { ClientSingleton } from "ClientSingleton";
import { IUser } from "combatcritters-ts";
import { useEffect, useState } from "react";
import { IDeck } from "combatcritters-ts";

export const useFriendsList = () => {
  const [friends, setFriends] = useState<IUser[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<IUser | null>(null);
  const [showDeck, setShowDeck] = useState(false);
  const [_, setFriendsDeck] = useState<IDeck | null>(null);

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
  }, []);


  const onFriendClick = async (user: IUser) => {
    setSelectedFriend(user);

    try {
      const deck = await ClientSingleton.getInstance().user.profile.getDeck();
      setFriendsDeck(deck);
    } catch (error) {
      console.error("Error fetching friend's deck:" + error);
    }
    setShowDeck(true);
  };

  return { friends, selectedFriend, showDeck, setShowDeck, onFriendClick };
};
