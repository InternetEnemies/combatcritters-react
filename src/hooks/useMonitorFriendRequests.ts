/**
 * @Created 2024-10-07
 * @Brief Hook used to fetch the number of pending friend requests a user has.
 */

import { ClientSingleton } from "ClientSingleton";
import { useEffect, useState } from "react";

export const useMonitorFriendRequests = () => {
  const [numberOfRequests, setNumberOfRequests] = useState(0);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const friendRequests =
          await ClientSingleton.getInstance().user.friends.getFriendsRequests();
        setNumberOfRequests(friendRequests.length);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    fetchFriendRequests();
  }, []);

  return numberOfRequests;
};
