import React from 'react';

const Card: React.FC<{
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ title, subtitle, footer, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow p-4">
      {title && (
        <div className="mb-2">
          <div className="font-semibold">{title}</div>
          {subtitle && <div className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</div>}
        </div>
      )}
      <div>{children}</div>
      {footer && <div className="mt-3 text-sm text-gray-500">{footer}</div>}
    </div>
  );
};

export default Card;
