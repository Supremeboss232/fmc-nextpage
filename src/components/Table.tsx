import React, { useMemo, useState } from 'react';

type Column = {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
  width?: string;
};

const Table: React.FC<{ columns: Column[]; data: any[]; rowKey: (r: any) => string }> = ({ columns, data, rowKey }) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    const copy = [...data];
    copy.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === 'number' && typeof vb === 'number') {
        return sortDir === 'asc' ? va - vb : vb - va;
      }
      return sortDir === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
    return copy;
  }, [data, sortKey, sortDir]);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto text-left">
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className="px-3 py-2 text-sm font-medium cursor-pointer"
                style={{ width: c.width }}
                onClick={() => toggleSort(c.key)}
              >
                <div className="flex items-center gap-2">
                  <span>{c.label}</span>
                  {sortKey === c.key && <span className="text-xs">{sortDir === 'asc' ? '↑' : '↓'}</span>}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={rowKey(row)} className="border-t dark:border-gray-700">
              {columns.map((c) => (
                <td key={c.key} className="px-3 py-2 align-top">
                  {c.render ? c.render(row) : String(row[c.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
