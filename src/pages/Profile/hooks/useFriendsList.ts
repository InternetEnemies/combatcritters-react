/**
 * @Created 2024-10-07
 * @Brief Hook that fetches a user's list of friends.
 */

import { ClientSingleton } from "ClientSingleton";
import { IUser } from "combatcritters-ts";
import { useEffect, useState } from "react";
import { IDeck } from "combatcritters-ts";

export const useFriendsList = (friends: IUser[], setFriends: (friends: IUser[]) => void, triggerToast: (msg: string) => void) => {
  const [selectedFriend, setSelectedFriend] = useState<IUser | null>(null);
  const [showDeck, setShowDeck] = useState(false);
  // eslint-disable-next-line
  const [friendsDeck, setFriendsDeck] = useState<IDeck | null>(null);

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

  const onFriendClick = async (user: IUser) => {
    setSelectedFriend(user);

    try {
      const deck = await ClientSingleton.getInstance().user.profile.getDeck();
      setFriendsDeck(deck);
    } catch (error) {
      console.error("Error fetching friend's deck:" + error);
    }
    if(friendsDeck) {
      setShowDeck(true);
    } else {
      triggerToast(user.username + " has no featured deck");
    }
  };

  return { friends, selectedFriend, showDeck, setShowDeck, onFriendClick };
};
