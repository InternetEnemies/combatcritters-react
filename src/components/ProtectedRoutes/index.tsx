import { Outlet, Navigate } from "react-router-dom";
import { ClientSingleton } from "ClientSingleton";

const useAuth = () => {
  return ClientSingleton.getInstance().isLoggedIn();
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
