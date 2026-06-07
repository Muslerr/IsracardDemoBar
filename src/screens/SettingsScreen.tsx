import { StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import ScreenContainer from '../components/ScreenContainer';
import ThemedText from '../components/ui/ThemedText';
import ThemedView from '../components/ui/ThemedView';
import ThemedButton from '../components/ui/ThemedButton';
import { useTheme, ThemeMode } from '../theme/ThemeProvider';
import { setThemeMode } from '../features/preferences/preferencesSlice';

const themeOptions: ReadonlyArray<{ value: ThemeMode; label: string }> = [
  { value: 'light', label: 'Light Mode' },
  { value: 'dark', label: 'Dark Mode' },
];

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(state => state.preferences.themeMode);
  const { colors } = useTheme();

  return (
    <ScreenContainer>
      <ThemedView style={styles.content}>
        <ThemedText style={styles.heading}>Settings</ThemedText>
        <ThemedText style={styles.subheading}>Theme</ThemedText>
        {themeOptions.map(option => (
          <ThemedButton
            key={option.value}
            title={option.label}
            onPress={() => dispatch(setThemeMode(option.value))}
            style={themeMode === option.value ? [styles.selectedButton, { backgroundColor: colors.primary }] : styles.button}
            textStyle={themeMode === option.value ? { color: colors.surface } : undefined}
          />
        ))}
      </ThemedView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    marginBottom: 12,
  },
  selectedButton: {
    marginBottom: 12,
  },
});
