import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
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
import { setViewMode } from '../features/preferences/preferencesSlice';
import { useTheme } from '../theme/ThemeProvider';


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
  const viewMode = useAppSelector(state => state.preferences.viewMode);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);
  const [sortOption, setSortOption] = useState<BooksSortOption>('title');
  const [isRetrying, setIsRetrying] = useState(false);
  const { colors } = useTheme();
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
      setIsRetrying(false);
    }
    if (error) {
      setIsRetrying(false);
    }
  }, [data, dispatch, isSuccess, error]);

  const rawBooks = cacheValid
    ? booksCache.items
    : data
    ? normalizeBooksResponse(data)
    : [];

  const booksToShow = useMemo(() => {
    const filtered = filterBooksByTitle(rawBooks, debouncedSearchText);
    return sortBooks(filtered, sortOption);
  }, [rawBooks, debouncedSearchText, sortOption]);

  const handleRetry = () => {
    setIsRetrying(true);
    refetch();
  };

  const handleToggleViewMode = () => {
    dispatch(setViewMode(viewMode === 'list' ? 'grid' : 'list'));
  };

  return (
    <ScreenContainer>
      <ThemedView style={styles.content}>
        <ThemedView style={styles.headerRow}>
          <ThemedText style={styles.heading}>Home</ThemedText>
          <TouchableOpacity
            style={[styles.viewToggleButton, { backgroundColor: colors.primary }]}
            onPress={handleToggleViewMode}
          >
            <ThemedText style={styles.viewToggleText}>
              {viewMode === 'list' ? '▦' : '☰'}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
        
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
            onRetry={handleRetry}
            isRetrying={isRetrying}
          />
        )}

        {!isLoading && !error && (
          <BooksList
            books={booksToShow}
            onBookPress={book => navigation.navigate('BookDetails', { bookId: book.id })}
            emptyMessage="No books available yet."
            viewMode={viewMode}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
  },
  viewToggleButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewToggleText: {
    fontSize: 16,
    color: '#ffffff',
  },
});


