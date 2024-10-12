import { ClientSingleton } from "ClientSingleton";
import Login from "pages/Login";
import { Outlet } from "react-router-dom";

const useAuth = () => {
    return ClientSingleton.getInstance().isLoggedIn();
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();

    return isAuth ? <Outlet /> : <Login/>;
}

export default ProtectedRoutes;