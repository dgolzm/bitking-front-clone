import React from 'react';
import './SurrenderButton.css';

export default function SurrenderButton({ onSurrender }) {
  return (
    <div className="surrender-container">
      <button className="surrender-button" onClick={onSurrender}>
        🏳️ Rendirse
      </button>
    </div>
  );
}
