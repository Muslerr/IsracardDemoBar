import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function PlaceholderScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>App is ready. Next step: build the feature screens.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});
