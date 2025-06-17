import { useEffect, useState } from 'react';
import { fetchNextEvent } from '../api/chessApi';

export default function useNextEvent() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNextEvent().then((data) => {
      setEvent(data);
      setLoading(false);
    });
  }, []);

  return { event, loading };
}