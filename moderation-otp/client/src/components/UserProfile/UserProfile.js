import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import "./Style/UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:3001/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };

    if (isAuthenticated) {
      fetchUserDetails();
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (!user) return null;

  return isAuthenticated ? (
    <div className="user-logout-container">
      <button onClick={handleLogout} className="logout-button">
        Déconnexion
      </button>
      <div className="user-profile">
        <p className="user-nick">{user.nick}</p>
        <img src={user.avatar} alt="User Avatar" className="user-avatar" />
      </div>
    </div>
  ) : (
    ""
  );
};

export default UserProfile;
