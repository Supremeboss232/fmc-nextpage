import { useCallback } from 'react';
import { useGlobal } from '../context/GlobalContext';
import { availableThemes } from '../config/theme';

export function useTheme() {
  const { theme, setTheme } = useGlobal();

  const toggleTheme = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light';
    if (!availableThemes.includes(next as any)) return;
    setTheme(next as 'light' | 'dark');
    try {
      document.documentElement.dataset.theme = next;
      localStorage.setItem('cf_theme', next);
    } catch {
      // ignore
    }
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
