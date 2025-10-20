import React from 'react';
import { createPortal } from 'react-dom';
import { ToastProvider, useToast } from '../context/ToastContext';

const Toasts: React.FC = () => {
  const { toasts, removeToast } = useToast();
  return createPortal(
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          aria-live="polite"
          className={`max-w-sm px-4 py-2 rounded shadow-lg text-white ${
            t.type === 'error' ? 'bg-red-600' : t.type === 'success' ? 'bg-green-600' : 'bg-gray-800'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm">{t.message}</div>
            <button aria-label="dismiss" onClick={() => removeToast(t.id)} className="text-white opacity-80">
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>,
    document.body
  );
};

export const ToastContainer: React.FC = () => {
  return (
    <ToastProvider>
      <Toasts />
    </ToastProvider>
  );
};

export { useToast };
