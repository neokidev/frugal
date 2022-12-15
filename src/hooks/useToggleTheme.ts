import type { ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useCallback } from 'react';

export const useToggleTheme = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'theme',
    defaultValue: 'light',
  });

  const toggleColorScheme = useCallback(
    () => setColorScheme((current) => (current === 'dark' ? 'light' : 'dark')),
    [setColorScheme]
  );

  return { isDarkMode: colorScheme === 'dark', toggleTheme: toggleColorScheme };
};
