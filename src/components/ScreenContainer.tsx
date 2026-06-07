import { ReactNode } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

type Props = {
  children: ReactNode;
};

export default function ScreenContainer({ children }: Props) {
  const { colors } = useTheme();
  return <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
