import React from 'react';
import Board from './Board';
import './BoardWithPlayers.css';

export default function BoardWithPlayers() {
  return (
    <div className="board-with-players">
      <div className="player-label top">Jugador 1</div>
      <Board />
      <div className="player-label bottom">Jugador 2</div>
    </div>
  );
}