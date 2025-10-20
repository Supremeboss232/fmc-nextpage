import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Table from '@/components/Table';
import { useMarkets } from '@/hooks/useMarkets';
import { formatCurrency, formatPercent, formatNumber } from '@/utils/formatters';

const MarketsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('search') || '';
  const pageParam = Number(searchParams.get('page') || '1');
  const navigate = useNavigate();

  const [search, setSearch] = useState(q);

  useEffect(() => {
    if (search !== q) {
      setSearch(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const { markets, loading, error, hasMore, fetchMore, page, total } = useMarkets({ limit: 20, search, page: pageParam });

  useEffect(() => {
    if (page !== pageParam) {
      setSearchParams((p) => {
        const next = new URLSearchParams(p);
        next.set('page', String(page));
        return next;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const sentinel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinel.current || !hasMore) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMore();
        }
      },
      { root: null, rootMargin: '300px', threshold: 0 }
    );
    obs.observe(sentinel.current);
    return () => obs.disconnect();
  }, [fetchMore, hasMore]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Markets</h2>
        <div>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchParams((p) => {
                const next = new URLSearchParams(p);
                next.set('search', e.target.value);
                next.set('page', '1');
                return next;
              });
            }}
            placeholder="Search markets..."
            className="px-3 py-2 border rounded bg-gray-50 dark:bg-gray-900"
          />
        </div>
      </div>

      <Table
        data={markets}
        rowKey={(r) => r.symbol}
        columns={[
          { key: 'symbol', label: 'Symbol', render: (r) => <div className="font-medium">{r.symbol}</div> },
          { key: 'price', label: 'Price', render: (r) => formatCurrency(r.price) },
          { key: 'change24h', label: '24h', render: (r) => <span className={r.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>{formatPercent(r.change24h)}</span> },
          { key: 'volume24h', label: 'Volume', render: (r) => formatNumber(r.volume24h) },
          { key: 'marketCap', label: 'Market Cap', render: (r) => formatNumber(r.marketCap) }
        ]}
      />

      {loading && <div className="text-sm text-gray-500">Loading...</div>}
      {error && <div className="text-sm text-red-600">Error: {error.message}</div>}

      <div ref={sentinel} />

      <div className="text-sm text-gray-500">
        Showing {markets.length} of {total}
      </div>
    </div>
  );
};

export default MarketsPage;
