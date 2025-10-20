import React from 'react';

const Pagination: React.FC<{
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}> = ({ page, totalPages, onPageChange }) => {
  const prev = () => onPageChange(Math.max(1, page - 1));
  const next = () => onPageChange(Math.min(totalPages, page + 1));
  return (
    <div className="flex items-center gap-2">
      <button onClick={prev} disabled={page <= 1} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700">
        Prev
      </button>
      <div>
        Page {page} / {totalPages}
      </div>
      <button onClick={next} disabled={page >= totalPages} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700">
        Next
      </button>
    </div>
  );
};

export default Pagination;
