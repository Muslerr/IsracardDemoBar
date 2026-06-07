import { StyleSheet } from 'react-native';
import { spacing } from '../theme';
import ThemedView from './ui/ThemedView';
import ThemedText from './ui/ThemedText';
import ThemedButton from './ui/ThemedButton';
import LoadingState from './LoadingState';

type Props = {
  message: string;
  onRetry: () => void;
  isRetrying?: boolean;
};

export default function ErrorState({ message, onRetry, isRetrying }: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.title]}>Something went wrong</ThemedText>
      <ThemedText style={[styles.message]}>{message}</ThemedText>
      {isRetrying ? (
        <LoadingState />
      ) : (
        <ThemedButton title="Retry" onPress={onRetry} style={styles.retryButton} />
      )}
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
  retryButton: {
    width: '100%',
  },
});
