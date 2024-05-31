import React, { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import dayjs from "dayjs";
import Timepicker from "../TimePicker/Timepicker";
import ConfirmationModal from "../ConfirmationModale/ConfirmationModale";
import "../../components/Timetable/Style/timetable.css";

const Timetable = ({ day, matches, ligue }) => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Trier les matches par date avant de les traiter
  const sortedMatches = matches
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/dispos?ligue=${ligue}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const sortedData = data.sort(
        (a, b) => new Date(a.start) - new Date(b.start)
      );
      setEvents(sortedData);
    } catch (error) {
      console.error("Erreur lors de la récupération des événements :", error);
    }
  }, [ligue]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (!sortedMatches || sortedMatches.length === 0) {
    return <p>Il n'y a pas de {ligue} cette semaine.</p>;
  }

  const matchesByDay = sortedMatches.reduce((acc, match) => {
    const matchDay = dayjs(match.date).format("YYYY-MM-DD");
    if (!acc[matchDay]) {
      acc[matchDay] = [];
    }
    acc[matchDay].push(match);
    return acc;
  }, {});

  const handleEventClick = (clickInfo) => {
    setEventToDelete(clickInfo.event);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    const eventId = eventToDelete.id;

    if (!eventId) {
      console.error("No event ID to delete");
      return;
    }

    console.log("Deleting event ID:", eventId);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/api/dispos`, // Change the endpoint as needed
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Ligue: ligue,
          },
          body: JSON.stringify({ id: eventId }), // Send the ID in the body of the request
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Event deleted successfully");

      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de l'événement :", error);
    } finally {
      setIsModalOpen(false);
      setEventToDelete(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventToDelete(null);
  };

  const days = Object.keys(matchesByDay);

  return (
    <div>
      {days.map((day, index) => {
        const dayMatches = matchesByDay[day];
        const firstMatchTime = dayjs(dayMatches[0].date);
        const slotMinTime = firstMatchTime.subtract(1, "hour").format("HH:mm");
        const slotMaxTime = firstMatchTime
          .add(dayMatches.length, "hour")
          .add(30, "minute")
          .format("HH:mm");

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
              events={events}
              selectable={false}
              selectMirror={true}
              editable={true}
              eventOverlap={true}
              eventClick={handleEventClick}
              resourceAreaWidth="0px"
              nowIndicator={true}
              nowIndicatorClassNames={"now"}
            />
            <div className="programme">
              <p>
                {" "}
                {`${firstMatchTime
                  .subtract(30, "minute")
                  .format("HH")}h${firstMatchTime
                  .subtract(30, "minute")
                  .format("mm")} - Preshow`}
              </p>
              {dayMatches.map((match, index) => (
                <p key={index}>{`${dayjs(match.date).format("HH")}h - ${
                  match.accronyms[0]
                } vs ${match.accronyms[1]}`}</p>
              ))}
            </div>
            <Timepicker ligue={ligue} fetchEvents={fetchEvents} day={day} />
          </div>
        );
      })}
      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onConfirm={confirmDelete}
        eventTitle={eventToDelete?.title}
      />
    </div>
  );
};

export default Timetable;
