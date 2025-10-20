import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGO_URL } from '@/assets/logo';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { useDebounce } from '@/hooks/useDebounce';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search, 400);
  const navigate = useNavigate();

  React.useEffect(() => {
    // navigate to markets with query when debounced changes
    if (debounced.length > 0) navigate(`/markets?search=${encodeURIComponent(debounced)}`);
  }, [debounced, navigate]);

  return (
    <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Logo" className="h-8 w-8" />
            <span className="font-semibold">CapitalFlowX</span>
          </Link>
          <nav className="hidden md:flex gap-3 ml-4">
            <Link to="/markets" className="text-sm hover:underline">
              Markets
            </Link>
            <Link to="/dashboard" className="text-sm hover:underline">
              Dashboard
            </Link>
          </nav>
        </div>

        <div className="flex-1 max-w-lg">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search markets (e.g. BTC, Ethereum)"
            className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            aria-label="search markets"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="toggle theme"
            className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700"
          >
            {theme === 'light' ? '🌤' : '🌙'}
          </button>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="px-3 py-1 rounded bg-brand-50 text-brand-700">
                Login
              </Link>
              <Link to="/register" className="px-3 py-1 rounded border dark:border-gray-700">
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <img src={user?.avatarUrl} alt={user?.name} className="h-8 w-8 rounded-full" />
              <div className="text-sm">{user?.name}</div>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
