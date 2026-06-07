import { StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

type Props = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export default function ThemedView({ style, children }: Props) {
  const { colors } = useTheme();
  return <View style={[{ backgroundColor: colors.background }, style]}>{children}</View>;
}
