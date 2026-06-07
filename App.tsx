import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { persistor, store } from './src/app/store';
import { ThemeProvider, useTheme } from './src/theme/ThemeProvider';

function AppContent() {
  const colorScheme = useColorScheme();
  const { themeMode } = useTheme();
  const effectiveTheme = themeMode === 'system' ? colorScheme ?? 'light' : themeMode;
  const navigationTheme = effectiveTheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <>
      <StatusBar
        barStyle={effectiveTheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer theme={navigationTheme}>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <SafeAreaProvider>
            <AppContent />
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
