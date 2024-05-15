import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import dayjs from 'dayjs';
import "./Style/timetable.css"; // Assurez-vous d'avoir ce fichier CSS pour les styles personnalisés

export default function MyCalendar(props) {
  const ligue = "LEC";
  const [events, setEvents] = useState([]);

  const handleDateSelect = (selectInfo) => {
    console.log("Sélection:", selectInfo); // Voir les détails de la sélection
    let title = prompt("Entre ton pseudo :"); // Demande du nom de l'événement
    let calendarApi = selectInfo.view.calendar;
  
    calendarApi.unselect(); // Nettoie la sélection visuelle
  
    if (title) {
      let startTime = dayjs(selectInfo.startStr);
      let endTime = dayjs(selectInfo.endStr);
      let hourEvents = [];

      while(startTime < endTime) {
        hourEvents.push({
          title,
          start: startTime.toISOString(),
          end: startTime.add(1, 'hour').toISOString(),
          allDay: selectInfo.allDay
        });
        startTime = startTime.add(1, 'hour');
      }

      console.log("Events to add:", hourEvents); // Log des événements pour vérifier
      setEvents(currentEvents => [...currentEvents, ...hourEvents]);
    }
  };

  return (
    <FullCalendar
      plugins={[resourceTimelinePlugin, interactionPlugin]}
      locales={[frLocale]}
      locale='fr'
      initialView="resourceTimelineDay"
      slotMinTime="11:00:00"
      slotMaxTime="17:00:00"
      resourceAreaHeaderContent={ligue}
      resources={[
        { id: 'a', title: 'Vendredi' },
      ]}
      events={props.events} // Utiliser l'état des événements
      selectable={true}
      selectMirror={true}
      select={handleDateSelect}
      editable={true} // Ajout pour rendre les événements éditables (si nécessaire)
      eventOverlap={false} // Pour empêcher le chevauchement des événements (optionnel)
    />
  );
}
