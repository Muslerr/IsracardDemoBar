import { Button, StyleSheet } from 'react-native';
import { spacing } from '../theme';
import { useTheme } from '../theme/ThemeProvider';
import ThemedView from './ui/ThemedView';
import ThemedText from './ui/ThemedText';

type Props = {
  message: string;
  onRetry: () => void;
};

export default function ErrorState({ message, onRetry }: Props) {
  const { colors } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.title]}>Something went wrong</ThemedText>
      <ThemedText style={[styles.message]}>{message}</ThemedText>
      <Button title="Retry" onPress={onRetry} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  message: {
    marginBottom: spacing.md,
    textAlign: 'center',
  },
});
