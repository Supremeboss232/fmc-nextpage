import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t dark:border-gray-700 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-sm">
          © {year} CapitalFlowX — UI Clone. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a className="text-sm hover:underline" href="/README.md">
            README
          </a>
          <a className="text-sm hover:underline" href="https://example.com/privacy" target="_blank" rel="noreferrer">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
