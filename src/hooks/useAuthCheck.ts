/**
 * @Created 2024-10-07
 * @Brief Hook that checks whether a user is logged in. If not it redirects them to the login page.
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClientSingleton } from "ClientSingleton";

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = ClientSingleton.getInstance().user;
    console.log("here in hook: " + user);
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);
};

export default useAuthRedirect;
