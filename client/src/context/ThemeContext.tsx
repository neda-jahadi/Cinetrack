import { createContext, useContext, useState, type ReactNode } from "react";

type ThemeContextType = {
  isInDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

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

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }

  return context;
};
