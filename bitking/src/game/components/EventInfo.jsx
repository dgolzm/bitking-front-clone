import React from 'react';
import useNextEvent from '../../hooks/useNextEvent.js';
import './EventInfo.css';

export default function EventInfo() {
  const { event, loading } = useNextEvent();

  if (loading) return <p>Cargando evento…</p>;
  if (!event) return <p>No hay eventos próximos.</p>;

  return (
    <div className="event-box">
      <div className="event-icon">{event.icon}</div>
      <div className="event-name">{event.name}</div>
      <div className="event-turns">{event.turnsRemaining} Turnos</div>
      <div className="event-desc">{event.description}</div>
    </div>
  );
}