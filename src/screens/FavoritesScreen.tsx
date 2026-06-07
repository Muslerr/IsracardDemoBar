import { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
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
import { setViewMode } from '../features/preferences/preferencesSlice';
import { useTheme } from '../theme/ThemeProvider';

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
  const viewMode = useAppSelector(state => state.preferences.viewMode);
  const { colors } = useTheme();

  const favoritesToShow = useMemo(() => {
    const filtered = filterFavoriteBooks(favorites, debouncedSearchText);
    return sortBooks(filtered, sortOption);
  }, [favorites, debouncedSearchText, sortOption]);

  const hasFavorites = favorites.length > 0;

  const handleToggleViewMode = () => {
    dispatch(setViewMode(viewMode === 'list' ? 'grid' : 'list'));
  };

  return (
    <ScreenContainer>
      <ThemedView style={styles.content}>
        <ThemedView style={styles.headerRow}>
          <ThemedText style={styles.heading}>Favorites</ThemedText>
          {hasFavorites && (
            <TouchableOpacity
              style={[styles.viewToggleButton, { backgroundColor: colors.primary }]}
              onPress={handleToggleViewMode}
            >
              <ThemedText style={styles.viewToggleText}>
                {viewMode === 'list' ? '▦' : '☰'}
              </ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>
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
              viewMode={viewMode}
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
