import { useState, useEffect } from 'react';
import { fetchPieces } from '../api/chessApi';

export default function useChessBoard() {
  const [pieces, setPieces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchPieces().then((data) => {
      if (mounted) {
        setPieces(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  return { pieces, loading };
}