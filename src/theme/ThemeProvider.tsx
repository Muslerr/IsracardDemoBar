import { createContext, ReactNode, useContext } from 'react';
import { useColorScheme, ColorSchemeName } from 'react-native';
import { useAppSelector } from '../hooks/reduxHooks';
import { darkColors, lightColors, ThemeColors } from './colors';

export type ThemeMode = 'system' | 'light' | 'dark';

type ThemeContextValue = {
  colors: ThemeColors;
  themeMode: ThemeMode;
  effectiveTheme: 'light' | 'dark';
};

const ThemeContext = createContext<ThemeContextValue>({
  colors: lightColors,
  themeMode: 'system',
  effectiveTheme: 'light',
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeMode = useAppSelector(state => state.preferences.themeMode);
  const systemScheme = useColorScheme();
  const effectiveTheme: 'light' | 'dark' =
    themeMode === 'system' 
      ? (systemScheme === 'dark' ? 'dark' : 'light')
      : themeMode === 'dark' ? 'dark' : 'light';

  const colors = effectiveTheme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ colors, themeMode, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
