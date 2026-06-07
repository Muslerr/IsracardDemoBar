import { StyleSheet, TouchableOpacity } from 'react-native';
import { spacing } from '../theme';
import { useTheme } from '../theme/ThemeProvider';
import ThemedView from './ui/ThemedView';
import ThemedText from './ui/ThemedText';

type SortOption = {
  value: string;
  label: string;
};

type Props = {
  options: readonly SortOption[];
  value: string;
  onChange: (value: string) => void;
};

export default function SortMenu({ options, value, onChange }: Props) {
  const { colors } = useTheme();

  return (
    <ThemedView style={styles.container}>
      {options.map(option => {
        const active = value === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.button,
              {
                backgroundColor: active ? colors.primary : colors.surface,
                borderColor: active ? colors.primary : colors.border,
              },
            ]}
            onPress={() => onChange(option.value)}
          >
            <ThemedText
              style={[
                styles.buttonText,
                { color: active ? colors.surface : colors.text },
              ]}
            >
              {option.label}
            </ThemedText>
          </TouchableOpacity>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  button: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 999,
    borderWidth: 1,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  buttonText: {
    fontSize: 13,
  },
});
