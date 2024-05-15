import React, { useState } from 'react';
import "../style/home.css";
import Timetable from "../components/Timetable/Timetable.js"
import colors from "../data/colorMapping.json"
import events from "../data/eventsLec.json"



const ScheduleLec = () => {

  function transformEvents(events) {
    // Définition d'un mapping pour les couleurs en fonction de l'ID
    const colorMapping = colors
    console.log(colors)

    // Ajout de deux nouveaux événements pour démonstration
    const additionalEvents = [
        { id: '4', resourceId: 'a', start: '2024-05-13T11:00:00', end: '2024-05-13T14:00:00', title: 'Jodeprout', color: colorMapping["4"] },
        { id: '5', resourceId: 'a', start: '2024-05-13T12:30:00', end: '2024-05-13T17:00:00', title: 'sMOUMy', color: colorMapping["5"] }
    ];

    // Transformation des événements existants
    const transformedEvents = events.map(event => ({
        ...event,
        color: colorMapping[event.id] || 'grey' // Utilisation de la couleur par défaut si l'ID n'est pas dans colorMapping
    }));

    // Combinaison des événements existants transformés avec les nouveaux événements
    return [...transformedEvents, ...additionalEvents];
}

const disposLec = transformEvents(events);
console.log(disposLec);

  return (
    <div className="body">
      <Timetable events = {disposLec}/>
      <Timetable/>
      
    </div>
  );
}

export default ScheduleLec; 














/*[
    { id: '1', resourceId: 'a', start: '2024-05-13T11:30:00', end: '2024-05-13T13:00:00', title: 'Tom', color:'red' },
    { id: '2', resourceId: 'a', start: '2024-05-13T11:00:00', end: '2024-05-13T15:00:00', title: 'Nokatir', color: "green" }, 
    { id: '3', resourceId: 'a', start: '2024-05-13T12:00:00', end: '2024-05-13T16:00:00', title: 'Prune', color: "blue" },
    { id: '4', resourceId: 'a', start: '2024-05-13T11:00:00', end: '2024-05-13T14:00:00', title: 'Jodeprout', color: "purple" },
    { id: '5', resourceId: 'a', start: '2024-05-13T12:30:00', end: '2024-05-13T17:00:00', title: 'sMOUMy', color: "#ff3f09"  }
  ]*/