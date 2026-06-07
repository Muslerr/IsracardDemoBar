import { StyleSheet, TextInput } from 'react-native';
import { spacing } from '../theme';
import { useTheme } from '../theme/ThemeProvider';
import ThemedView from './ui/ThemedView';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChangeText, placeholder }: Props) {
  const { colors } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? 'Search books...'}
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        placeholderTextColor={colors.muted}
        returnKeyType="search"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
  },
});
