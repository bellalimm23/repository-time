import invariant from 'invariant';
import React from 'react';

export type ThemeType = 'dark' | 'light';

export type ThemeContextType = {
  theme: ThemeType;
  onChangeTheme: (theme: ThemeType) => void;
  onToggle: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  onChangeTheme(theme) {},
  onToggle() {},
  theme: 'light',
});

export const themeKey = 'theme';

export function getLocalstorageTheme(): ThemeType {
  return (localStorage.getItem(themeKey) as ThemeType) || 'light';
}

export function setLocalstorageTheme(theme: ThemeType) {
  localStorage.setItem(themeKey, theme);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<ThemeType>('light');

  const onChangeTheme = React.useCallback((theme: ThemeType) => {
    setLocalstorageTheme(theme);
    setTheme(theme);
  }, []);

  const onToggle = React.useCallback(() => {
    setTheme((prev) => {
      const result = prev === 'dark' ? 'light' : 'dark';
      setLocalstorageTheme(result);
      return result;
    });
  }, []);

  const value = React.useMemo(() => {
    return { theme, onChangeTheme, onToggle };
  }, [onChangeTheme, onToggle, theme]);

  React.useEffect(() => {
    const theme = getLocalstorageTheme();
    setTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default function useTheme() {
  const context = React.useContext(ThemeContext);

  invariant(
    context !== undefined,
    'useTheme must be used inside ThemeProvider',
  );
  return context;
}
