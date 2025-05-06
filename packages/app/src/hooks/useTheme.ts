import type { ThemeMode } from '@/types';
import { useEffect } from 'react';
import { useMediaQuery, useLocalStorage } from 'usehooks-ts';

export const useTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useLocalStorage<ThemeMode>('theme-mode', 'system');
  const themeMode = theme === 'system' ? (prefersDarkMode ? 'dark' : 'light') : theme;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [theme, themeMode]);

  return [theme, setTheme];
};
