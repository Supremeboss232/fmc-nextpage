import { useEffect, useState, useCallback } from 'react';
import { fetchMarkets } from '../api';
import type { Market } from '../types/global';
import { useDebounce } from './useDebounce';
import { useGlobal } from '../context/GlobalContext';

export function useMarkets(params: { limit?: number; search?: string; page?: number } = {}) {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(params.page ?? 1);
  const [total, setTotal] = useState(0);
  const debouncedSearch = useDebounce(params.search ?? '', 400);
  const global = useGlobal();

  const load = useCallback(
    async (p = page) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchMarkets({ limit: params.limit ?? 20, search: debouncedSearch, page: p });
        setMarkets(res.items);
        setTotal(res.total);
        setPage(res.page);
        // cache items
        res.items.forEach((it) => global.updateMarket(it));
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearch, params.limit, page, global]
  );

  useEffect(() => {
    // reset page when search changes
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, params.limit]);

  const refresh = useCallback(() => load(page), [load, page]);

  const fetchMore = useCallback(async () => {
    if (markets.length >= total) return;
    const nextPage = page + 1;
    setLoading(true);
    try {
      const res = await fetchMarkets({ limit: params.limit ?? 20, search: debouncedSearch, page: nextPage });
      setMarkets((s) => [...s, ...res.items]);
      setPage(res.page);
      res.items.forEach((it) => global.updateMarket(it));
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [markets.length, total, page, params.limit, debouncedSearch, global]);

  return {
    markets,
    loading,
    error,
    refresh,
    page,
    total,
    hasMore: markets.length < total,
    fetchMore
  };
}
