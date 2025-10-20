import React from 'react';

const ChartPlaceholder: React.FC<{ title?: string; data?: any; height?: number }> = ({
  title = 'Price',
  data,
  height = 180
}) => {
  return (
    <div className="bg-gradient-to-b from-white dark:from-gray-800 to-gray-50 dark:to-gray-900 border dark:border-gray-700 rounded p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-500">24h</div>
      </div>
      <div
        aria-hidden
        style={{ height }}
        className="w-full rounded bg-gradient-to-r from-indigo-50 to-transparent dark:from-indigo-900/30"
      >
        <div className="h-full flex items-center justify-center text-gray-400">Chart placeholder</div>
      </div>
    </div>
  );
};

export default ChartPlaceholder;
