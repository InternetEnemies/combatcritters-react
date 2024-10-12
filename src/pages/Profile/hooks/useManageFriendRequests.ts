/**
 * @Created 2024-10-07
 * @Brief Hook for accepting friend requests.
 */

import { ClientSingleton } from "ClientSingleton";
import { IUser } from "combatcritters-ts";
import { useEffect, useState } from "react";

export const useManageFriendRequests = (
  friends: IUser[],
  setFriends: (friends: IUser[]) => void,
  numberOfRequests: number,
  setNumberOfRequests: (num: number) => void
) => {
  const [friendRequests, setFriendRequests] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const fRequests =
          await ClientSingleton.getInstance().user.friends.getFriendsRequests();
        setFriendRequests(fRequests);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    fetchFriendRequests();
  }, []);

  const acceptFriendRequest = async (user: IUser) => {
    try {
      await ClientSingleton.getInstance().user.friends.addFriend(user);

      setFriendRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== user.id)
      );

      setFriends([...friends, user]);

      setNumberOfRequests(numberOfRequests-1);
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };


  return { friendRequests, acceptFriendRequest };
};
