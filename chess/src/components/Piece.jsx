import React from 'react';

const GLYPHS = {
  white: {
    king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙',
  },
  black: {
    king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟',
  },
};

export default function Piece({ type, color }) {
  return <span>{GLYPHS[color][type]}</span>;
}