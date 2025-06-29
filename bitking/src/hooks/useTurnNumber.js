import { useEffect, useState } from 'react';
import { fetchTurnNumber } from '../api/chessApi';

export default function useTurnNumber(refreshInterval = 2000) {
  const [turn, setTurn] = useState(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const data = await fetchTurnNumber();
      if (mounted) setTurn(data);
    };

    load();
    const interval = setInterval(load, refreshInterval);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [refreshInterval]);

  return turn;
}