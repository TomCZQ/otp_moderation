import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Timetable from "../components/Timetable/Timetable";
import axios from "axios";
import dayjs from "dayjs";
import "../style/Planning.css";

// Fonction utilitaire pour obtenir la semaine de l'année
function getWeekNumber(date) {
  const firstDayOfYear = dayjs(date).startOf("year");
  const pastDaysOfYear = dayjs(date).diff(firstDayOfYear, "day");
  return Math.ceil((pastDaysOfYear + firstDayOfYear.day() + 1) / 7);
}

const Planning = () => {
  const { league } = useParams();
  const [matches, setMatches] = useState([]);
  const [week, setWeek] = useState(getWeekNumber(new Date()));

  useEffect(() => {
    const apiURL = `http://localhost:3001/api/matches`;

    axios
      .get(apiURL, {
        headers: {
          League: league.toUpperCase(),
          Week: week,
        },
      })
      .then((response) => {
        setMatches(response.data);
      })
      .catch((error) => {
        console.error("Error fetching matches:", error);
      });
  }, [league, week]);

  const matchesByDay = matches.reduce((acc, match) => {
    const day = new Date(match.date).toLocaleDateString("fr-FR", {
      weekday: "long",
    });
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(match);
    return acc;
  }, {});

  return (
    <div className="main-container-planning">
      <h2>{`Planning ${league.toUpperCase()}`}</h2>
      <div className="planning-container">
        {Object.keys(matchesByDay).length === 0 ? (
          <p>{`Pas de matchs de ${league} cette semaine.`}</p>
        ) : (
          Object.keys(matchesByDay).map((day) => (
            <Timetable
              key={day}
              day={day}
              matches={matchesByDay[day]}
              ligue={`${league.toUpperCase()}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Planning;
