import { useCallback, useState } from 'react';

interface UseToggleColorTheme {
  (initialColorTheme?: 'light' | 'dark'): {
    isDarkMode: boolean;
    toggleColorTheme: () => void;
  };
}

export const useToggleColorTheme: UseToggleColorTheme = (initialColorTheme) => {
  const [isDarkMode, setIsDarkMode] = useState(initialColorTheme === 'dark');

  const toggleColorTheme = useCallback(
    () => setIsDarkMode((isDarkMode) => !isDarkMode),
    []
  );

  return { isDarkMode, toggleColorTheme };
};
