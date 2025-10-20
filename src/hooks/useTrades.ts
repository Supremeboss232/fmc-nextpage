import { useEffect, useRef, useState, useCallback } from 'react';
import { fetchTrades } from '../api';
import type { Trade } from '../types/global';

export function useTrades(symbol: string | null, limit = 50) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const intervalRef = useRef<number | null>(null);

  const load = useCallback(
    async (sig = symbol) => {
      if (!sig) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetchTrades(sig, limit);
        setTrades(res);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [symbol, limit]
  );

  useEffect(() => {
    load(symbol);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol]);

  const subscribe = useCallback(
    (auto = true) => {
      if (!symbol) return () => {};
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      // poll every 2s
      const id = window.setInterval(() => {
        fetchTrades(symbol, limit)
          .then((res) => setTrades(res))
          .catch(() => {
            /* ignore individual fetch errors */
          });
      }, 2000);
      intervalRef.current = id;
      if (!auto) {
        window.clearInterval(id);
        intervalRef.current = null;
      }
      return () => {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      };
    },
    [symbol, limit]
  );

  const refresh = useCallback(() => {
    load(symbol);
  }, [load, symbol]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return { trades, loading, error, refresh, subscribe };
}
