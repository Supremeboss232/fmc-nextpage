import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title?: string; children?: React.ReactNode }> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const el = elRef.current!;
    document.body.appendChild(el);
    return () => {
      try {
        document.body.removeChild(el);
      } catch {
        //
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-2xl w-full bg-white dark:bg-gray-800 rounded shadow-lg p-6">
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <div>{children}</div>
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700">
            Close
          </button>
        </div>
      </div>
    </div>,
    elRef.current
  );
};

export default Modal;
