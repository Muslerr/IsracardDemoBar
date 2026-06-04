import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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

  if (!book) {
    return (
      <ScreenContainer>
        <View style={styles.emptyContainer}>
          <Text style={styles.title}>Book not found</Text>
          <Text style={styles.body}>
            This book is not available in cache or favorites.
          </Text>
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
      </ScreenContainer>
    );
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(book));
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.subtitle}>{book.releaseDate}</Text>
        <Image source={{ uri: book.cover }} style={styles.cover} />
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.body}>{book.description}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Pages:</Text>
          <Text style={styles.metaValue}>{book.pages}</Text>
        </View>
        <View style={styles.buttonRow}>
          <Button
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onPress={handleToggleFavorite}
          />
        </View>
      </View>
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
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
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
    color: '#111827',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
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
