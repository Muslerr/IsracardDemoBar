import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/navigationTypes';

const sampleBook = {
  bookId: 'sample-book-1',
  title: 'Sample Book',
  releaseDate: '2025-01-01',
  cover: 'https://via.placeholder.com/120x180',
  description: 'This is a placeholder book used to verify navigation.',
  pages: 320,
};

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Home</Text>
      <Text style={styles.body}>This is the Home tab. Use the button below to open book details.</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Open Book Details"
          onPress={() => navigation.navigate('BookDetails', sampleBook)}
        />
      </View>
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
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
});
