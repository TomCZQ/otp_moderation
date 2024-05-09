import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import "../style/timetable.css"

export default function Timetable() {

    return (
        <div className="timetable-container">
            <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridDay"
            locale={frLocale}
            slotMinTime="08:00:00" // Début à 8h du matin
            slotMaxTime="18:00:00" // Fin à 18h
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: ""
            }}
            events={[
                { title: 'MSI', date: '2024-05-09', start: '2024-05-09T10:00:00', end: '2024-05-09T15:00:00' },
                { title: 'Nokatir', date: '2024-05-09', start: '2024-05-09T10:00:00', end: '2024-05-09T13:00:00', color: "red" },
                { title: 'Lunch Break', date: '2024-05-10', start: '2024-05-10T13:00:00', end: '2024-05-10T14:00:00' }
            ]}
        />
        <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridDay"
            locale={frLocale}
            slotMinTime="08:00:00" // Début à 8h du matin
            slotMaxTime="18:00:00" // Fin à 18h
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: ""
            }}
            events={[
                { title: 'MSI', date: '2024-05-09', start: '2024-05-09T10:00:00', end: '2024-05-09T15:00:00' },
                { title: 'Lunch Break', date: '2024-05-10', start: '2024-05-10T13:00:00', end: '2024-05-10T14:00:00' }
            ]}
        />
        <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridDay"
            locale={frLocale}
            slotMinTime="08:00:00" // Début à 8h du matin
            slotMaxTime="18:00:00" // Fin à 18h
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: ""
            }}
            events={[
                { title: 'MSI', date: '2024-05-09', start: '2024-05-09T10:00:00', end: '2024-05-09T15:00:00' },
                { title: 'Lunch Break', date: '2024-05-10', start: '2024-05-10T13:00:00', end: '2024-05-10T14:00:00' }
            ]}
        />
        </div>
        
    );

}
