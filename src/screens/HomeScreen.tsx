import { useEffect } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useGetBooksQuery } from '../api/booksApi';
import { normalizeBooksResponse, isBooksCacheValid } from '../features/books/booksUtils';
import { setBooksCache } from '../features/books/booksCacheSlice';
import { RootStackParamList } from '../navigation/navigationTypes';

const sampleBook = {
  id: 'sample-book-1',
  title: 'Sample Book',
  releaseDate: '2025-01-01',
  cover: 'https://via.placeholder.com/120x180',
  description: 'This is a placeholder book used to verify navigation.',
  pages: 320,
};

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const dispatch = useAppDispatch();
  const booksCache = useAppSelector(state => state.booksCache);
  const cacheValid = isBooksCacheValid(booksCache.lastFetchedAt) && booksCache.items.length > 0;
  const queryArg = cacheValid ? skipToken : undefined;

  const {
    data,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useGetBooksQuery(queryArg);

  useEffect(() => {
    if (isSuccess && data) {
      const normalizedBooks = normalizeBooksResponse(data);
      dispatch(
        setBooksCache({ items: normalizedBooks, lastFetchedAt: Date.now() }),
      );
    }
  }, [data, dispatch, isSuccess]);

  const booksToShow = cacheValid
    ? booksCache.items
    : data
    ? normalizeBooksResponse(data)
    : [];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Home</Text>
      {cacheValid && (
        <Text style={styles.statusText}>Showing cached books from the last 24 hours.</Text>
      )}
      {isLoading && <Text style={styles.statusText}>Loading books...</Text>}
      {error && (
        <View style={styles.messageContainer}>
          <Text style={styles.errorText}>Failed to load books.</Text>
          <Button title="Retry" onPress={() => refetch()} />
        </View>
      )}
      <ScrollView contentContainerStyle={styles.list}>
        {booksToShow.length > 0 ? (
          booksToShow.map(book => (
            <TouchableOpacity
              key={book.id}
              style={styles.bookItem}
              onPress={() => navigation.navigate('BookDetails', book)}
            >
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookMeta}>{book.releaseDate}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.messageContainer}>
            <Text style={styles.body}>No books available yet.</Text>
            {!isLoading && (
              <Button title="Retry" onPress={() => refetch()} />
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  list: {
    paddingBottom: 16,
  },
  bookItem: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    marginBottom: 12,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookMeta: {
    color: '#6B7280',
  },
  messageContainer: {
    marginBottom: 16,
  },
  errorText: {
    color: '#B91C1C',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    marginBottom: 12,
  },
  buttonContainer: {
    marginTop: 12,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'center',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 12,
//   },
//   body: {
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     width: '100%',
//   },
// });
