import React, { useEffect, useState } from 'react';
import './Timer.css';

export default function Timer({ initialMinutes = 2, initialSeconds = 5 }) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(s => s - 1);
      } else {
        if (minutes > 0) {
          setMinutes(m => m - 1);
          setSeconds(59);
        } else {
          clearInterval(timer);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);

  const formatTime = (n) => n.toString().padStart(2, '0');

  return (
    <div className="timer">
      <span className="timer-icon">🕒</span>
      <span className="timer-time">{formatTime(minutes)}:{formatTime(seconds)}</span>
    </div>
  );
}