/**
 * @Created 2024-10-07
 * @Brief Hook used to fetch the number of pending friend requests a user has.
 */

import { ClientSingleton } from "ClientSingleton";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useMonitorFriendRequests = (setNumberOfRequests: (num: number) => void) => {
  const location = useLocation();


  const fetchFriendRequests = async () => {
    try {
      const friendRequests =
        await ClientSingleton.getInstance().user.friends.getFriendsRequests();
      setNumberOfRequests(friendRequests.length);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  //Fetch friend requests on mount
  useEffect(() => {
    fetchFriendRequests();
  }, []);

  //Fetch friend requests on page change
   useEffect(() => {
     fetchFriendRequests();
   }, [location]);

  return;
};
