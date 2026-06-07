import { StyleSheet } from 'react-native';
import { spacing } from '../theme';
import ThemedView from './ui/ThemedView';
import ThemedText from './ui/ThemedText';

type Props = {
  message: string;
};

export default function EmptyState({ message }: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.message]}>{message}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
});
