import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Card from '@/components/Card';
import Table from '@/components/Table';
import { exportToCsv } from '@/utils/csv';
import type { Market } from '@/types/global';

type Holding = {
  symbol: string;
  amount: number;
  avgPrice: number;
};

const STORAGE_KEY = (userId: string) => `portfolio_${userId}`;

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [holdings, setHoldings] = useState<Holding[]>([]);

  useEffect(() => {
    if (!user) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY(user.id));
      if (raw) setHoldings(JSON.parse(raw));
      else {
        const sample: Holding[] = [
          { symbol: 'BTC', amount: 0.5, avgPrice: 20000 },
          { symbol: 'ETH', amount: 2, avgPrice: 1500 }
        ];
        setHoldings(sample);
      }
    } catch {
      setHoldings([]);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    try {
      localStorage.setItem(STORAGE_KEY(user.id), JSON.stringify(holdings));
    } catch {
      // ignore
    }
  }, [holdings, user]);

  const exportCsv = () => {
    exportToCsv('portfolio.csv', holdings as any, ['symbol', 'amount', 'avgPrice']);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <Card title="Portfolio Summary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-500">Total Value</div>
            <div className="font-semibold">$—</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Unrealized P/L</div>
            <div className="font-semibold text-green-500">—</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Cash</div>
            <div className="font-semibold">$—</div>
          </div>
        </div>
      </Card>

      <Card title="Holdings" footer={<div className="text-right"><button onClick={exportCsv} className="px-3 py-1 rounded bg-gray-200">Export CSV</button></div>}>
        <Table
          data={holdings}
          rowKey={(r) => r.symbol}
          columns={[
            { key: 'symbol', label: 'Symbol' },
            { key: 'amount', label: 'Amount' },
            { key: 'avgPrice', label: 'Avg Price', render: (r) => `$${r.avgPrice.toFixed(2)}` }
          ]}
        />
      </Card>
    </div>
  );
};

export default DashboardPage;
