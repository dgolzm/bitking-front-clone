import React from 'react';
import EventInfo from './components/EventInfo';
import Timer from './components/Timer';
import TurnCounter from './components/TurnCounter';
import ClassBattle from './components/ClassBattle';
import SurrenderButton from './components/SurrenderButton';
import BoardWithPlayers from './components/BoardWithPlayers';
import './App.css';

export default function App() {
  const handleSurrender = () => {
    alert('Te has rendido. Fin del juego.');
  };

  return (
    <main className="game-layout">
      <div className="side-panel">
        <div className="side-panel-content">
          <EventInfo />
          <Timer initialMinutes={2} initialSeconds={5} />
          <TurnCounter />
          <ClassBattle />
        </div>
        <SurrenderButton onSurrender={handleSurrender} />
      </div>
      <div className="center-panel">
        <BoardWithPlayers />
      </div>
    </main>
  );
}
