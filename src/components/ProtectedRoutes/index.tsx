import { Outlet, Navigate } from "react-router-dom";
import { ClientSingleton } from "ClientSingleton";
import {useEffect, useState} from "react";

const ProtectedRoutes = () => {
  const [isAuth, setAuth] = useState(false);
  let [isReady, setReady] = useState(false);
  useEffect(() => {
    const updateAuth = async () => {
      setAuth(await ClientSingleton.getInstance().isLoggedIn());
      setReady(true);
    }
    updateAuth();
  }, []);

  if (isReady) {
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
  } else {
    return <div></div>
  }
};

export default ProtectedRoutes;
