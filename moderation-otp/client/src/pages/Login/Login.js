import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext/AuthContext";
import "../Login/Style/login.css";
import kekl from "../../assets/KEKL.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://moderation-otp.fr/api/users/login",
        { username, password }
      );
      login(response.data.token);
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Tu t'es trompé d'identifiant ou de mot de passe, c'est low.";
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} className="form-login">
        <div className="input-username">
          <label>Identifiant :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-password">
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Se connecter</button>
        {error && (
          <p className="error">
            {error}
            <img src={kekl} alt="kekl" />
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
