import React from 'react';
import Card from '@/components/Card';
import ChartPlaceholder from '@/components/ChartPlaceholder';
import { useMarkets } from '@/hooks/useMarkets';
import MarketListItem from '@/components/MarketListItem';

const HomePage: React.FC = () => {
  const { markets, loading } = useMarkets({ limit: 5 });

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded text-white p-6">
        <h1 className="text-2xl font-bold">CapitalFlowX</h1>
        <p className="mt-2 max-w-2xl">Real-time market insights, portfolio tracking and trading mock UI for demos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <Card title="Market Overview">
            <ChartPlaceholder title="Top Market Movement" />
          </Card>
          <Card title="Featured Markets">
            <div className="space-y-2">
              {loading && <div className="text-sm text-gray-500">Loading...</div>}
              {!loading && markets.length === 0 && <div className="text-sm text-gray-500">No markets found</div>}
              <div className="grid grid-cols-1 gap-2">
                {markets.map((m) => (
                  <MarketListItem key={m.symbol} market={m} />
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Recent Trades">
            <div className="text-sm text-gray-500">Trades data is available on market detail pages.</div>
          </Card>
          <Card title="News & Updates">
            <ul className="text-sm list-disc list-inside text-gray-500">
              <li>Demo app with mock API</li>
              <li>Replace adapter to connect to real backend</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
