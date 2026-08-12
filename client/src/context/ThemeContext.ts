import { createContext } from 'react';

export type ThemeContextType = {
  isInDarkMode: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
