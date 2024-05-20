import React from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import dayjs from "dayjs";
import "./Style/timetable.css";

const Timetable = ({ day, matches, ligue }) => {
  if (!matches || matches.length === 0) {
    return <p>No matches scheduled for this day.</p>;
  }

  const firstMatchTime = dayjs(matches[0].date);
  const slotMinTime = firstMatchTime.subtract(30, "minute").format("HH:mm:ss");
  const slotMaxTime = firstMatchTime
    .add(matches.length, "hour")
    .format("HH:mm:ss");

  const events = [];
  const matchesOfTheDay = matches.map((match) => ({
    title: match.title || `${match.accronyms[0]} vs ${match.accronyms[1]}`,
  }));

  return (
    <div className="programme-container">
      <div className="programme">
        {matchesOfTheDay.map((match, index) => (
          <div key={index} className="match">
            {match.title}
          </div>
        ))}
      </div>
      <FullCalendar
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        locales={[frLocale]}
        locale="fr"
        initialView="resourceTimelineDay"
        slotMinTime={slotMinTime}
        slotMaxTime={slotMaxTime}
        resourceAreaHeaderContent={day}
        resources={events.title}
        events={""}
        selectable={false}
        selectMirror={true}
        editable={false}
        eventOverlap={false}
      />
    </div>
  );
};

export default Timetable;
