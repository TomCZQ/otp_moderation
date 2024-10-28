import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Timetable from "../../components/Timetable/Timetable";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import dayjs from "dayjs";
import "./Style/Planning.scss";
import prankex from "../../assets/prankex.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function getWeekNumber(date) {
  const firstDayOfYear = dayjs(date).startOf("year");
  const pastDaysOfYear = dayjs(date).diff(firstDayOfYear, "day");
  return Math.ceil((pastDaysOfYear + firstDayOfYear.day() + 1) / 7);
}

const Planning = () => {
  const { league } = useParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [week, setWeek] = useState(getWeekNumber(new Date()));
  const navigate = useNavigate();

  const returnToPlanning = () => {
    navigate("/planning");
  };

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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching matches:", error);
        setLoading(false);
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

  if (loading) return <Loader />;
  return (
    <div className="main-container-planning">
      <h2>
        <FontAwesomeIcon icon={faChevronLeft} onClick={returnToPlanning} />
        {`Planning ${league.toUpperCase()}`}
      </h2>
      <div className="planning-container">
        {Object.keys(matchesByDay).length === 0 ? (
          <div className="prankex">
            <p>{`Pas de ${league.toUpperCase()} cette semaine.`}</p>

            <p>
              {"(ou alors c'est pas encore à jour)"}
              <img src={prankex} alt="prankex"></img>
            </p>
          </div>
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
