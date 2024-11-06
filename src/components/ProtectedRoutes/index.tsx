import { Outlet, Navigate } from "react-router-dom";
import { ClientSingleton } from "ClientSingleton";
import { useEffect, useState } from "react";
import { useCurrency } from "contexts/CurrencyContext";

const ProtectedRoutes = () => {
  const [isAuth, setAuth] = useState(false);
  const [isReady, setReady] = useState(false);
  const { updateCurrency } = useCurrency();

  useEffect(() => {
    const updateAuthAndCurrency = async () => {
      const authStatus = await ClientSingleton.getInstance().isLoggedIn();
      setAuth(authStatus);

      if (authStatus) {
        try {
          await updateCurrency();
        } catch (error) {
          console.error("Error updating currency:", error);
        }
      }

      setReady(true);
    };

    updateAuthAndCurrency();
  }, [updateCurrency]);

  if (isReady) {
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
  } else {
    return <div></div>
  }
};

export default ProtectedRoutes;
