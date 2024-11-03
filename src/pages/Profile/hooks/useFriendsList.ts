/**
 * @Created 2024-10-07
 * @Brief Hook that fetches a user's list of friends.
 */

import { ClientSingleton } from "ClientSingleton";
import { ICard, IDeck, IUser } from "combatcritters-ts";
import { useEffect, useState } from "react";

export const useFriendsList = (
  friends: IUser[],
  setFriends: (friends: IUser[]) => void
) => {
  const [selectedFriend, setSelectedFriend] = useState<IUser | null>(null);
  const [showDeck, setShowDeck] = useState(false);
  const [featuredDeck, setFeaturedDeck] = useState<IDeck | null>(null);
  const [deckCards, setDeckCards] = useState<ICard[] | null>(null);

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

  /**
   * On user change, fetch the user's featured deck and fetch the cards in the deck.
   */
  useEffect(() => {
    if (selectedFriend) {
      const setDeckAndCards = async () => {
        try {
          const featuredD = await selectedFriend.profile.getDeck();
          setFeaturedDeck(featuredD);

          if (featuredD) {
            const cards = await featuredD.getCards();
            setDeckCards(cards);
          }
        } catch (error) {
          console.error("Error during profile fetch:" + error);
        }
      };
      setDeckAndCards();
    }
  }, [selectedFriend]);

  return {
    friends,
    selectedFriend,
    setSelectedFriend,
    showDeck,
    setShowDeck,
    onFriendClick,
  };
};
