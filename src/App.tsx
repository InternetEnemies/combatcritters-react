/**
 * @Created 2024-10-07
 * @Brief Main application component.
 */

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Collection from "pages/Collection";
import Login from "pages/Login";
import Profile from "pages/Profile";
import { useState } from "react";
import NavBar from "components/NavBar";
import "./app.css";
import ProtectedRoutes from "components/ProtectedRoutes";
import Packs from "pages/Packs";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Vendors from "pages/Vendors";
import { CurrencyProvider } from "contexts/CurrencyContext";
import Battle from "pages/Battle";
import {BattleTest} from "./pages/BattleTest";

function App() {
  const [numberOfRequests, setNumberOfRequests] = useState(0); // Number of friend requests
  const location = useLocation();

  // Check if the navbar should be visible
  const isNavbarVisible =
    location.pathname !== "/login" && location.pathname !== "/" && location.pathname !== "/battle";

  return (
    <div className="appRoot">
      {isNavbarVisible && (
        <div className="navBarContainer">
          <NavBar
            numberOfRequests={numberOfRequests}
            setNumberOfRequests={setNumberOfRequests}
          />
        </div>
      )}

      <div className="appPagesContainer">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/collection" element={<Collection />} />
            <Route
              path="/profile"
              element={
                <Profile
                  numberOfRequests={numberOfRequests}
                  setNumberOfRequests={setNumberOfRequests}
                />
              }
            />
            <Route path="/packs" element={<Packs />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/battle" element={<Battle/>}/>
            <Route path="/btest" element={<BattleTest/>} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        toastStyle={{ backgroundColor: "#333", color: "white" }}
      />
    </div>
  );
}

function AppWrapper() {
  return (
    <CurrencyProvider>
      <Router>
        <App />
      </Router>
    </CurrencyProvider>
  );
}

export default AppWrapper;
