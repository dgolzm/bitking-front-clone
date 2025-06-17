import React from 'react';
import useClasses from '../../hooks/useClasses';
import './ClassBattle.css';

export default function ClassBattle() {
  const classes = useClasses();

  if (!classes) return <p>Cargando clases…</p>;
  const { class1, class2 } = classes;

  return (
    <div className="class-battle">
      <div className="class-battle-images">
        <img src={`/assets/${class1}.png`} alt={class1} className="class-image" />
        <span className="vs-text">vs</span>
        <img src={`/assets/${class2}.png`} alt={class2} className="class-image" />
      </div>
      <div className="class-labels">
        <span>Clase 1</span>
        <span>Clase 2</span>
      </div>
    </div>
  );
}