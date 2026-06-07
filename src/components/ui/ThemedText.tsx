import { Text, TextProps, StyleProp, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

type Props = TextProps & {
  style?: StyleProp<TextStyle>;
};

export default function ThemedText({ style, ...props }: Props) {
  const { colors } = useTheme();
  return <Text style={[{ color: colors.text }, style]} {...props} />;
}
