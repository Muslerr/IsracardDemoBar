import { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import ThemedText from '../components/ui/ThemedText';
import ThemedView from '../components/ui/ThemedView';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { filterFavoriteBooks, sortBooks } from '../features/books/booksUtils';
import { BooksSortOption } from '../features/books/booksTypes';
import { removeFavorite } from '../features/favorites/favoritesSlice';
import { RootStackParamList } from '../navigation/navigationTypes';
import BooksList from '../components/BooksList';
import SearchBar from '../components/SearchBar';
import SortMenu from '../components/SortMenu';
import EmptyState from '../components/EmptyState';
import ScreenContainer from '../components/ScreenContainer';
import useDebounce from '../hooks/useDebounce';

const sortOptions = [
  { value: 'title', label: 'Title' },
  { value: 'pages', label: 'Pages' },
  { value: 'releaseDate', label: 'Release Date' },
] as const;

type FavoritesNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function FavoritesScreen() {
  const navigation = useNavigation<FavoritesNavigationProp>();
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);
  const [sortOption, setSortOption] = useState<BooksSortOption>('title');
  const favorites = useAppSelector(state => state.favorites.books);

  const favoritesToShow = useMemo(() => {
    const filtered = filterFavoriteBooks(favorites, debouncedSearchText);
    return sortBooks(filtered, sortOption);
  }, [favorites, debouncedSearchText, sortOption]);

  const hasFavorites = favorites.length > 0;

  return (
    <ScreenContainer>
      <ThemedView style={styles.content}>
        <ThemedText style={styles.heading}>Favorites</ThemedText>
        {hasFavorites ? (
          <>
            <SearchBar
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search favorites..."
            />
            <SortMenu
              options={sortOptions}
              value={sortOption}
              onChange={value => setSortOption(value as 'title' | 'pages' | 'releaseDate')}
            />
            <BooksList
              books={favoritesToShow}
              onBookPress={book => navigation.navigate('BookDetails', { bookId: book.id })}
              onRemovePress={bookId => dispatch(removeFavorite(bookId))}
              showRemoveButton
              emptyMessage="No favorites match your search."
            />
          </>
        ) : (
          <EmptyState message="No favorite books yet. Add a favorite from the Home tab." />
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
