import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Square from './Square';
import Piece from './Piece';
import './Board.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Board() {
  const query = useQuery();
  const gameId = query.get("id");

  const [currentPieces, setCurrentPieces] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPieces() {
      try {
        const res = await fetch(`http://localhost:5000/api/games/${gameId}/pieces`);;
        if (!res.ok) throw new Error("Error al obtener piezas");
        const data = await res.json();

        const parsed = data.map(p => ({
          id: p.id,
          type: p.tipo,
          color: p.color,
          row: p.fila - 1,
          col: parseInt(p.columna, 10) - 1
        }));

        setCurrentPieces(parsed);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar el tablero:", error);
        setLoading(false);
      }
    }

    if (gameId) {
      fetchPieces();
    }
  }, [gameId]);

  if (loading) return <p>Cargando tablero…</p>;

  const board = Array.from({ length: 8 }, () => Array(8).fill(null));
  currentPieces.forEach(p => {
    board[p.row][p.col] = p;
  });

  const handleSquareClick = async (row, col) => {
    const clickedPiece = board[row][col];

    if (selected) {
      const from = { row: selected.row + 1, col: selected.col + 1 };
      const to = { row: row + 1, col: col + 1 };

      const movingPiece = currentPieces.find(
        piece => piece.row === selected.row && piece.col === selected.col
      );

      const capturedPiece = clickedPiece && clickedPiece.color !== movingPiece.color
        ? clickedPiece
        : null;

      const updatedPieces = currentPieces
        .filter(piece => !(capturedPiece && piece.id === capturedPiece.id))
        .map(piece => {
          if (piece.id === movingPiece.id) {
            return { ...piece, row, col };
          }
          return piece;
        });

      setCurrentPieces(updatedPieces);
      setSelected(null);

      try {
      if (capturedPiece) {
        const deleteRes = await fetch(`http://localhost:5000/api/pieces/${capturedPiece.id}/delete`, {
          method: "DELETE"
        });
        if (!deleteRes.ok) {
          console.error("Error al eliminar pieza capturada");
        }
      }

      const moveRes = await fetch(`http://localhost:5000/api/games/${gameId}/move`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pieceID: movingPiece.id,
          fila: to.row,
          columna: to.col.toString()
        }),
      });

      if (!moveRes.ok) {
        console.error("Error al registrar el movimiento en el backend");
      }
    } catch (error) {
      console.error("Error de red durante movimiento o captura:", error);
    }


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
