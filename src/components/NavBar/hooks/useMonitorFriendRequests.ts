import { useCallback, useEffect } from "react";
import { ClientSingleton } from "ClientSingleton";
import { useLocation } from "react-router-dom";

export const useMonitorFriendRequests = (
  setNumberOfRequests: (num: number) => void
) => {
  const location = useLocation();

  const fetchFriendRequests = useCallback(async () => {
    try {
      const friendRequests =
        await ClientSingleton.getInstance().user.friends.getFriendsRequests();
      setNumberOfRequests(friendRequests.length);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  }, [setNumberOfRequests]);

  //Fetch friend requests on mount
  useEffect(() => {
    fetchFriendRequests();
  }, [fetchFriendRequests]); 

  // Fetch friend requests on page change
  useEffect(() => {
    fetchFriendRequests();
  }, [location, fetchFriendRequests]);

  return;
};
