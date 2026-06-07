import { ActivityIndicator, StyleSheet } from 'react-native';
import { spacing } from '../theme';
import { useTheme } from '../theme/ThemeProvider';
import ThemedView from './ui/ThemedView';
import ThemedText from './ui/ThemedText';

export default function LoadingState() {
  const { colors } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <ThemedText style={[styles.text]}>Loading books…</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  text: {
    marginTop: spacing.sm,
    fontSize: 16,
  },
});
