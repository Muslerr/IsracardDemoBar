import { StyleProp, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

type Props = TouchableOpacityProps & {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function ThemedButton({ title, style, textStyle, ...props }: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          backgroundColor: colors.primary,
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Text style={[{ color: colors.surface, fontWeight: '600' }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
