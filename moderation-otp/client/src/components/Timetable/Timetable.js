import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import dayjs from "dayjs";
import Timepicker from "../TimePicker/Timepicker";

import "../../components/Timetable/Style/timetable.css";

const Timetable = ({ day, matches, ligue }) => {
  const [events, setEvents] = useState([]); // Utilisation de l'état pour les événements

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/dispos?ligue=${ligue}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des événements :", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [ligue]); // Le fetch sera ré-exécuté si `ligue` change

  if (!matches || matches.length === 0) {
    return <p>Il n'y a pas de {ligue} cette semaine.</p>;
  }

  const matchesByDay = matches.reduce((acc, match) => {
    const matchDay = dayjs(match.date).format("YYYY-MM-DD");
    if (!acc[matchDay]) {
      acc[matchDay] = [];
    }
    acc[matchDay].push(match);
    return acc;
  }, {});

  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(`Veux-tu enlever ${clickInfo.event.title} du planning?`)
    ) {
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== clickInfo.event.id)
      );
    }
  };

  const days = Object.keys(matchesByDay);

  return (
    <div>
      {days.map((day, index) => {
        const dayMatches = matchesByDay[day];
        const firstMatchTime = dayjs(dayMatches[0].date);
        const slotMinTime = firstMatchTime
          .subtract(30, "minute")
          .format("HH:mm:ss");
        const slotMaxTime = firstMatchTime
          .add(dayMatches.length, "hour")
          .add(30, "minute")
          .format("HH:mm:ss");

        const calendarEvents = dayMatches.map((match) => ({
          id: match._id,
          title:
            match.title || `${match.accronyms[0]} vs ${match.accronyms[1]}`,
          start: match.date,
          end: dayjs(match.date).add(match.bo, "hour").toISOString(),
          resourceId: "singleResource",
        }));

        const resources = [
          {
            id: "a",
            title: "Modos présent(e)s",
          },
        ];

        return (
          <div key={index} className="timetable-container">
            <FullCalendar
              plugins={[resourceTimelinePlugin, interactionPlugin]}
              locales={[frLocale]}
              locale="fr"
              initialView="resourceTimelineDay"
              slotMinTime={slotMinTime}
              slotMaxTime={slotMaxTime}
              initialDate={day}
              resourceAreaHeaderContent={ligue}
              resources={resources}
              events={events} // Utilisation de l'état pour les événements
              selectable={false}
              selectMirror={true}
              editable={true}
              eventOverlap={true}
              eventClick={handleEventClick} // Ajout de la gestion des clics sur les évènements
            />
            <div className="programme">
              {dayMatches.map((match, index) => (
                <p key={index}>{`${dayjs(match.date).format("HH")}h - ${
                  match.accronyms[0]
                } vs ${match.accronyms[1]}`}</p>
              ))}
            </div>
            <Timepicker ligue={ligue} fetchEvents={fetchEvents} day={day} />{" "}
            {/* Ajouter le composant Timepicker avec les props nécessaires */}
          </div>
        );
      })}
    </div>
  );
};

export default Timetable;
