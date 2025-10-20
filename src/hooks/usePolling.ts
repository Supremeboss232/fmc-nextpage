import { useRef, useCallback } from 'react';

export function usePolling<T>(fn: () => Promise<T>, interval = 2000) {
  const ref = useRef<number | null>(null);

  const start = useCallback(
    (onTick: (data: T) => void) => {
      const tick = async () => {
        try {
          const data = await fn();
          onTick(data);
        } catch {
          // ignore
        }
      };
      tick();
      const id = window.setInterval(tick, interval);
      ref.current = id;
      return () => {
        if (ref.current) {
          window.clearInterval(ref.current);
          ref.current = null;
        }
      };
    },
    [fn, interval]
  );

  const stop = useCallback(() => {
    if (ref.current) {
      window.clearInterval(ref.current);
      ref.current = null;
    }
  }, []);

  return { start, stop };
}
