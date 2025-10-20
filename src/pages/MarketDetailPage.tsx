import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMarketDetail } from '@/api';
import ChartPlaceholder from '@/components/ChartPlaceholder';
import { useTrades } from '@/hooks/useTrades';
import { formatCurrency, timeAgo } from '@/utils/formatters';
import type { MarketDetail } from '@/types/global';

const MarketDetailPage: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [detail, setDetail] = useState<MarketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { trades, loading: tradesLoading, subscribe, refresh } = useTrades(symbol ?? null, 50);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!symbol) return;
    let mounted = true;
    setLoading(true);
    fetchMarketDetail(symbol)
      .then((d) => {
        if (!mounted) return;
        setDetail(d);
      })
      .catch((err) => setError(err))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [symbol]);

  useEffect(() => {
    if (!symbol) return;
    let unsub: (() => void) | undefined;
    if (live) {
      unsub = subscribe();
    }
    return () => {
      unsub && unsub();
    };
  }, [live, subscribe, symbol]);

  if (!symbol) return <div>Invalid market</div>;
  if (loading) return <div>Loading market...</div>;
  if (error) return <div className="text-red-600">Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{symbol}</h2>
          <div className="text-sm text-gray-500">{detail?.description}</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold">{detail && formatCurrency(detail.price)}</div>
          <div className="text-sm text-gray-500">Updated just now</div>
        </div>
      </div>

      <ChartPlaceholder title={`${symbol} Price`} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="font-medium mb-2">Order Book</div>
          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-3 rounded">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th>Bid</th>
                  <th>Ask</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                {detail?.orderBook.map((o, i) => (
                  <tr key={i} className="border-t dark:border-gray-700">
                    <td className="py-1">{formatCurrency(o.bid)}</td>
                    <td>{formatCurrency(o.ask)}</td>
                    <td>{o.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">Recent Trades</div>
            <div className="text-sm">
              <button
                onClick={() => setLive((s) => !s)}
                className={`px-2 py-1 rounded ${live ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                {live ? 'Live On' : 'Live Off'}
              </button>
              <button onClick={refresh} className="ml-2 px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">
                Refresh
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-2 rounded text-sm">
            {tradesLoading && <div className="text-gray-500">Loading trades...</div>}
            {!tradesLoading && trades.length === 0 && <div className="text-gray-500">No trades</div>}
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Side</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((t) => (
                  <tr key={t.id} className="border-t dark:border-gray-700">
                    <td className="py-1">{timeAgo(t.timestamp)}</td>
                    <td>{formatCurrency(t.price)}</td>
                    <td>{t.amount}</td>
                    <td className={t.side === 'buy' ? 'text-green-500' : 'text-red-500'}>{t.side}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDetailPage;
