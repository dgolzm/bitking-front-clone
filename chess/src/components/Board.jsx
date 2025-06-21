import React, { useEffect, useState } from 'react';
import Square from './Square';
import Piece from './Piece';
import useChessBoard from '../../hooks/useChessBoard';
import './Board.css';

export default function Board() {
  const { pieces, loading } = useChessBoard();
  const [currentPieces, setCurrentPieces] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!loading && pieces.length > 0) {
      setCurrentPieces(pieces);
    }
  }, [loading, pieces]);

  if (loading) return <p>Cargando tablero…</p>;

  const board = Array.from({ length: 8 }, () => Array(8).fill(null));
  currentPieces.forEach(p => {
    board[p.row][p.col] = p;
  });

  const handleSquareClick = (row, col) => {
    const clickedPiece = board[row][col];

    if (selected) {
      const updatedPieces = currentPieces
      .filter(piece => !(piece.row === row && piece.col === col)) 
      .map(piece => {
        if (piece.row === selected.row && piece.col === selected.col) {
          return { ...piece, row, col };
        }
        return piece;
      });

    setCurrentPieces(updatedPieces);

      setSelected(null);
    } else if (clickedPiece) {
      setSelected({ row, col });
    }
  };

  return (
    <div className="board">
      {board.map((rowArr, rowIdx) =>
        rowArr.map((piece, colIdx) => {
          const isDark = (rowIdx + colIdx) % 2 === 1;
          const isSelected =
            selected &&
            selected.row === rowIdx &&
            selected.col === colIdx;

          return (
            <Square
              key={`${rowIdx}-${colIdx}`}
              isDark={isDark}
              isSelected={isSelected}
              onClick={() => handleSquareClick(rowIdx, colIdx)}
            >
              {piece && <Piece type={piece.type} color={piece.color} />}
            </Square>
          );
        })
      )}
    </div>
  );
}
