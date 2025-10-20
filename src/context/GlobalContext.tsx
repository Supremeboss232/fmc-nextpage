import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Market } from '../types/global';

type GlobalState = {
  user: User | null;
  token: string | null;
  theme: 'light' | 'dark';
  marketsCache: Record<string, Market>;
  login: (token: string, user: User) => void;
  logout: () => void;
  setTheme: (t: 'light' | 'dark') => void;
  updateMarket: (m: Market) => void;
};

const defaultState: GlobalState = {
  user: null,
  token: null,
  theme: 'light',
  marketsCache: {},
  login: () => {},
  logout: () => {},
  setTheme: () => {},
  updateMarket: () => {}
};

const GlobalContext = createContext<GlobalState>(defaultState);

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('cf_user');
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('cf_token');
    } catch {
      return null;
    }
  });
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    try {
      const raw = localStorage.getItem('cf_theme');
      return (raw as 'light' | 'dark') || 'light';
    } catch {
      return 'light';
    }
  });

  const [marketsCache, setMarketsCache] = useState<Record<string, Market>>({});

  useEffect(() => {
    try {
      if (user) localStorage.setItem('cf_user', JSON.stringify(user));
      else localStorage.removeItem('cf_user');
      if (token) localStorage.setItem('cf_token', token);
      else localStorage.removeItem('cf_token');
      if (theme) localStorage.setItem('cf_theme', theme);
      document.documentElement.dataset.theme = theme;
    } catch {
      // ignore
    }
  }, [user, token, theme]);

  const login = (t: string, u: User) => {
    setToken(t);
    setUser(u);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const setTheme = (t: 'light' | 'dark') => {
    setThemeState(t);
  };

  const updateMarket = (m: Market) => {
    setMarketsCache((prev) => ({ ...prev, [m.symbol]: m }));
  };

  return (
    <GlobalContext.Provider value={{ user, token, theme, marketsCache, login, logout, setTheme, updateMarket }}>
      {children}
    </GlobalContext.Provider>
  );
};
