import { ReactNode } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { colors } from '../theme';

type Props = {
  children: ReactNode;
};

export default function ScreenContainer({ children }: Props) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
