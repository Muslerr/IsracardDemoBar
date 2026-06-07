import React from 'react';
import { Button, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ThemedText from '../components/ui/ThemedText';
import ThemedButton from '../components/ui/ThemedButton';
import ThemedView from '../components/ui/ThemedView';
import { useTheme } from '../theme/ThemeProvider';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { RootStackParamList } from '../navigation/navigationTypes';
import { selectFavoriteById } from '../features/favorites/favoritesSelectors';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import ScreenContainer from '../components/ScreenContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetails'>;

export default function BookDetailsScreen({ navigation, route }: Props) {
  const { bookId } = route.params;
  const dispatch = useAppDispatch();

  const cachedBook = useAppSelector(state =>
    state.booksCache.items.find(book => book.id === bookId),
  );
  const favoriteBook = useAppSelector(state => selectFavoriteById(state, bookId));
  const [book] = React.useState(() => cachedBook ?? favoriteBook);
  const isFavorite = Boolean(favoriteBook);

  const { colors } = useTheme();

  if (!book) {
    return (
      <ScreenContainer>
        <ThemedView style={styles.emptyContainer}>
          <ThemedText style={styles.title}>Book not found</ThemedText>
          <ThemedText style={styles.body}>
            This book is not available in cache or favorites.
          </ThemedText>
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </ThemedView>
      </ScreenContainer>
    );
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(book));
  };

  return (
    <ScreenContainer>
      <ThemedView style={styles.content}>
        <ThemedText style={styles.title}>{book.title}</ThemedText>
        <ThemedText style={styles.subtitle}>{book.releaseDate}</ThemedText>
        <Image source={{ uri: book.cover }} style={[styles.cover, { backgroundColor: colors.border }]} />
        <ThemedText style={styles.sectionTitle}>Description</ThemedText>
        <ThemedText style={styles.body}>{book.description}</ThemedText>
        <ThemedView style={[styles.metaRow, { borderTopColor: colors.border }]}>
          <ThemedText style={styles.metaLabel}>Pages:</ThemedText>
          <ThemedText style={styles.metaValue}>{book.pages}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.buttonRow}>
          <ThemedButton
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onPress={handleToggleFavorite}
            style={{ width: '100%' }}
          />
        </ThemedView>
      </ThemedView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  cover: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  metaLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  metaValue: {
    fontSize: 16,
  },
  buttonRow: {
    marginTop: 20,
  },
});
