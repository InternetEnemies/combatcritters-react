/**
 * @Created 2024-10-07
 * @Brief Hook for accepting friend requests.
 */

import { ClientSingleton } from "ClientSingleton";
import { IUser } from "combatcritters-ts";
import { useEffect, useState } from "react";

export const useManageFriendRequests = () => {
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
      setFriendRequests(
        (prevRequests) =>
          prevRequests.filter((request) => request.id !== user.id)
      );
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  return { friendRequests, acceptFriendRequest };
};