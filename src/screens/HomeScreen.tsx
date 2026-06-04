import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useGetBooksQuery } from '../api/booksApi';
import {
  filterBooksByTitle,
  normalizeBooksResponse,
  isBooksCacheValid,
  sortBooks,
} from '../features/books/booksUtils';
import { setBooksCache } from '../features/books/booksCacheSlice';
import { RootStackParamList } from '../navigation/navigationTypes';
import BooksList from '../components/BooksList';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import SearchBar from '../components/SearchBar';
import SortMenu from '../components/SortMenu';
import ScreenContainer from '../components/ScreenContainer';


type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const sortOptions = [
  { value: 'title', label: 'Title' },
  { value: 'pages', label: 'Pages' },
  { value: 'releaseDate', label: 'Release Date' },
] as const;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const dispatch = useAppDispatch();
  const booksCache = useAppSelector(state => state.booksCache);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState<'title' | 'pages' | 'releaseDate'>('title');
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
    const filtered = filterBooksByTitle(rawBooks, searchText);
    return sortBooks(filtered, sortOption);
  }, [rawBooks, searchText, sortOption]);

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text style={styles.heading}>Home</Text>
        
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
            onBookPress={book => navigation.navigate('BookDetails', book)}
            emptyMessage="No books available yet."
          />
        )}
      </View>
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
  statusText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
});


