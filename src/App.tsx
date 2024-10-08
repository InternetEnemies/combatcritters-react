/**
 * @Created 2024-10-07
 * @Brief Main application component. Initializes the client.
 */

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ClientSingleton } from "./ClientSingleton";
import Collection from "pages/Collection";

function App() {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const client = ClientSingleton.getInstance();

  useEffect(() => {
    const initializeClient = async () => {
      try {
        // await client.register("kevin", "1234");
        await client.login("kevin", "1234");
        console.log(client.user.username + " is logged in.");
      } catch (error) {
      } finally {
        setIsInitialized(true);
      }
    };

    initializeClient();
  }, [client]);

  if (!isInitialized) {
    return null;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/collection" />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
    </Router>
  );
}

export default App;
