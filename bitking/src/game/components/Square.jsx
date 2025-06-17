import React from 'react';
import './Square.css';

export default function Square({ isDark, isSelected, children, onClick }) {
  let className = `square ${isDark ? 'dark' : 'light'}`;
  if (isSelected) className += ' selected';

  return <div className={className} onClick={onClick}>{children}</div>;
}
