import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Favorites</Text>
      <Text style={styles.body}>This is the Favorites tab placeholder.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
  },
});
