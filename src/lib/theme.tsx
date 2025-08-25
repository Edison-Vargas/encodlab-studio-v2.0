import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      // Sistema mantém o estado root padrão (sem classe adicional)
      // Isso permite que o tema "sistema" seja visualmente diferente dos outros
      const handleSystemChange = (e: MediaQueryListEvent) => {
        // Apenas atualiza se ainda estiver no modo sistema
        if (theme === "system") {
          // Força uma re-renderização sutil para mostrar que está seguindo o sistema
          root.style.setProperty('--system-indicator', e.matches ? 'dark' : 'light');
        }
      };

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener('change', handleSystemChange);
      
      // Define indicador inicial
      root.style.setProperty('--system-indicator', mediaQuery.matches ? 'dark' : 'light');

      return () => {
        mediaQuery.removeEventListener('change', handleSystemChange);
        root.style.removeProperty('--system-indicator');
      };
    }

    root.classList.add(theme);
    root.style.removeProperty('--system-indicator');
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};