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

function App() {
  const [numberOfRequests, setNumberOfRequests] = useState(0); // Number of friend requests
  const location = useLocation();

  // Check if the navbar should be visible
  const isNavbarVisible =
    location.pathname !== "/login" && location.pathname !== "/";

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
      <h1>test</h1>

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
          </Route>
        </Routes>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
