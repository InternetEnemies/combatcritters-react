/**
 * @Created 2024-10-07
 * @Brief Login component.
 */

import { ClientSingleton } from "ClientSingleton";
import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import Switch from "components/Switch";
import { useCurrency } from "contexts/CurrencyContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginSelected, setLoginSelected] = useState(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { updateCurrency } = useCurrency();

  const handleLogin = async () => {
    try {
      await ClientSingleton.getInstance().login(username, password);
      await updateCurrency(); //Fetch currency on login
      navigate("/collection");
    } catch (e) {
      setError("Failed to log in.");
    }
  };

  useEffect(() => {
    setError(null);
  }, [loginSelected]);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await ClientSingleton.getInstance().register(username, password);
      await ClientSingleton.getInstance().login(username, password);
      await updateCurrency();
      navigate("/collection");
    } catch (e) {
      setError("Failed to register.");
    }
  };

  return (
    <div className="loginRoot">
      <h1 className="title">
        <span className="title-part">Welcome to</span>
        <span className="title-part">Combat Critters 2.0!</span>
      </h1>

      <div className="loginContainer">
        <Switch
          isLeftToggled={loginSelected}
          setIsLeftToggled={setLoginSelected}
          leftOption="Login"
          rightOption="Signup"
          className="login"
        />

        <div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>

        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        {!loginSelected && (
          <div>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </div>
        )}

        <Button
          text={loginSelected ? "Log In" : "Register"}
          onClick={loginSelected ? handleLogin : handleRegister}
        />
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
