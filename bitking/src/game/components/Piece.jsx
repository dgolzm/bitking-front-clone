import React from 'react';

const GLYPHS = {
  white: {
    king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙',
  },
  black: {
    king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟',
  },
};

const typeMap = {
  torre: 'rook',
  caballo: 'knight',
  alfil: 'bishop',
  reina: 'queen',
  rey: 'king',
  peon: 'pawn',
};

const colorMap = {
  blanco: 'white',
  negro: 'black',
};

export default function Piece({ type, color }) {
  const mappedType = typeMap[type];
  const mappedColor = colorMap[color];

  if (!mappedType || !mappedColor) {
    console.warn("Tipo o color inválido:", { type, color });
    return <span>❓</span>;
  }

  return <span>{GLYPHS[mappedColor][mappedType]}</span>;
}
