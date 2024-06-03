import React, { useState, useEffect } from "react";
import axios from "axios";
import "../TimePicker/Style/Timepicker.css";
import { useAuth } from "../AuthContext/AuthContext";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Timepicker = ({ ligue, fetchEvents, day }) => {
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "https://www.moderation-otp.fr/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
    } catch (err) {
      console.error("Failed to fetch user details:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);

  useEffect(() => {}, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startHour || !endHour) {
      alert("Please fill in all fields");
      return;
    }

    if (!user) {
      alert("User not authenticated");
      return;
    }

    const start = dayjs(day)
      .hour(startHour.split(":")[0])
      .minute(startHour.split(":")[1])
      .second(0)
      .format("YYYY-MM-DDTHH:mm:ss");
    const end = dayjs(day)
      .hour(endHour.split(":")[0])
      .minute(endHour.split(":")[1])
      .second(0)
      .format("YYYY-MM-DDTHH:mm:ss");

    const id = `${user.nick || user.username}-${start}-${end}`;
    const resourceId = "a";
    const title = user.nick || user.username;
    const color = user.roles.includes("1048626805726261248")
      ? "#f37957"
      : "#ff3f09";

    try {
      await axios.post(
        "https://www.moderation-otp.fr/api/dispos",
        {
          id,
          resourceId,
          start,
          end,
          title,
          color,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Ligue: ligue,
          },
        }
      );

      fetchEvents(); // Rafraîchir les événements après l'ajout
      setStartHour("");
      setEndHour("");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="form">
      <h2>Ajout au planning</h2>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="startHour">De:</label>
          <input
            type="time"
            id="startHour"
            value={startHour}
            onChange={(e) => setStartHour(e.target.value)}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="endHour">À:</label>
          <input
            type="time"
            id="endHour"
            value={endHour}
            onChange={(e) => setEndHour(e.target.value)}
            required
          />
        </div>
        <button type="submit">S'ajouter</button>
      </form>
    </div>
  );
};

export default Timepicker;
