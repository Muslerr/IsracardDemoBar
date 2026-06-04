import { Button, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

type Props = {
  message: string;
  onRetry: () => void;
};

export default function ErrorState({ message, onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{message}</Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
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
    color: colors.text,
  },
  message: {
    marginBottom: spacing.md,
    color: colors.muted,
    textAlign: 'center',
  },
});
