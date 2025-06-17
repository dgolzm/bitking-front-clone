import React from 'react';
import useClasses from '../../hooks/useClasses.js';
import './ClassBattle.css';

import alienImg from '../../assets/alien.png';
import robotImg from '../../assets/robot.png';
import humanImg from '../../assets/humano.png';
import zombieImg from '../../assets/zombie.png'; // <- asumiendo que usarás la correcta

const classImages = {
  alien: alienImg,
  robot: robotImg,
  human: humanImg,
  zombie: zombieImg,
};

export default function ClassBattle() {
  const classes = useClasses();

  if (!classes) return <p>Cargando clases…</p>;
  const { class1, class2 } = classes;

  return (
    <div className="class-battle">
      <div className="class-battle-images">
        <img src={classImages[class1]} alt={class1} className="class-image" />
        <span className="vs-text">vs</span>
        <img src={classImages[class2]} alt={class2} className="class-image" />
      </div>
      <div className="class-labels">
        <span>{class1}</span>
        <span>{class2}</span>
      </div>
    </div>
  );
}