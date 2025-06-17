import React from 'react';
import useTurnNumber from '../../hooks/useTurnNumber';
import './TurnCounter.css';

export default function TurnCounter() {
  const turn = useTurnNumber();

  return (
    <div className="turn-counter">
      #Turno: {turn ?? 'Cargando…'}
    </div>
  );
}