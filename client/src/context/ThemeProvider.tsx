import { useState, type ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isInDarkMode, setIsInDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsInDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isInDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
