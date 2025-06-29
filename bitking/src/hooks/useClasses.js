import { useEffect, useState } from 'react';
import { fetchClasses } from '../api/chessApi';

export default function useClasses() {
  const [classes, setClasses] = useState(null);

  useEffect(() => {
    fetchClasses().then(setClasses);
  }, []);

  return classes;
}