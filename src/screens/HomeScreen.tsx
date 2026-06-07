import { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import ThemedText from '../components/ui/ThemedText';
import ThemedView from '../components/ui/ThemedView';
import { useGetBooksQuery } from '../api/booksApi';
import {
  filterBooksByTitle,
  normalizeBooksResponse,
  isBooksCacheValid,
  sortBooks,
} from '../features/books/booksUtils';
import { BooksSortOption } from '../features/books/booksTypes';
import { setBooksCache } from '../features/books/booksCacheSlice';
import { RootStackParamList } from '../navigation/navigationTypes';
import BooksList from '../components/BooksList';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import SearchBar from '../components/SearchBar';
import SortMenu from '../components/SortMenu';
import ScreenContainer from '../components/ScreenContainer';
import useDebounce from '../hooks/useDebounce';


type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const sortOptions: ReadonlyArray<{ value: BooksSortOption; label: string }> = [
  { value: 'title', label: 'Title' },
  { value: 'pages', label: 'Pages' },
  { value: 'releaseDate', label: 'Release Date' },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const dispatch = useAppDispatch();
  const booksCache = useAppSelector(state => state.booksCache);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);
  const [sortOption, setSortOption] = useState<BooksSortOption>('title');
  const cacheValid =
    isBooksCacheValid(booksCache.lastFetchedAt) && booksCache.items.length > 0;
  const queryArg = cacheValid ? skipToken : undefined;

  const { data, error, isLoading, isSuccess, refetch } = useGetBooksQuery(queryArg);

  useEffect(() => {
    if (isSuccess && data) {
      const normalizedBooks = normalizeBooksResponse(data);
      dispatch(
        setBooksCache({ items: normalizedBooks, lastFetchedAt: Date.now() }),
      );
    }
  }, [data, dispatch, isSuccess]);

  const rawBooks = cacheValid
    ? booksCache.items
    : data
    ? normalizeBooksResponse(data)
    : [];

  const booksToShow = useMemo(() => {
    const filtered = filterBooksByTitle(rawBooks, debouncedSearchText);
    return sortBooks(filtered, sortOption);
  }, [rawBooks, debouncedSearchText, sortOption]);

  return (
    <ScreenContainer>
      <ThemedView style={styles.content}>
        <ThemedText style={styles.heading}>Home</ThemedText>
        
        <SearchBar value={searchText} onChangeText={setSearchText} />
        <SortMenu
          options={sortOptions}
          value={sortOption}
          onChange={value => setSortOption(value as 'title' | 'pages' | 'releaseDate')}
        />

        {isLoading && <LoadingState />}

        {error && (
          <ErrorState
            message="Unable to load books. Please try again."
            onRetry={refetch}
          />
        )}

        {!isLoading && !error && (
          <BooksList
            books={booksToShow}
            onBookPress={book => navigation.navigate('BookDetails', { bookId: book.id })}
            emptyMessage="No books available yet."
          />
        )}
      </ThemedView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
});


