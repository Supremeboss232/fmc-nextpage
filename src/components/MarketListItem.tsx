import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Market } from '../types/global';
import { formatCurrency, formatPercent, formatNumber } from '../utils/formatters';

const MarketListItem: React.FC<{ market: Market; onClick?: (symbol: string) => void }> = ({ market, onClick }) => {
  const navigate = useNavigate();
  const handle = () => {
    if (onClick) onClick(market.symbol);
    else navigate(`/markets/${encodeURIComponent(market.symbol)}`);
  };
  return (
    <div
      onClick={handle}
      className="cursor-pointer flex items-center justify-between p-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded hover:shadow"
    >
      <div>
        <div className="font-medium">{market.symbol}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{market.name}</div>
      </div>
      <div className="text-right">
        <div className="font-semibold">{formatCurrency(market.price)}</div>
        <div className={`text-sm ${market.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {formatPercent(market.change24h)}
        </div>
        <div className="text-xs text-gray-500">{formatNumber(market.volume24h)}</div>
      </div>
    </div>
  );
};

export default MarketListItem;
