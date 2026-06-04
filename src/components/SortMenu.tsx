import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, spacing } from '../theme';

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
  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.button,
            value === option.value && styles.activeButton,
          ]}
          onPress={() => onChange(option.value)}
        >
          <Text
            style={[
              styles.buttonText,
              value === option.value && styles.activeText,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  activeButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  buttonText: {
    color: colors.text,
    fontSize: 13,
  },
  activeText: {
    color: colors.surface,
  },
});
