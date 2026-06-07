import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Book } from '../features/books/booksTypes';
import { spacing } from '../theme';
import { useTheme } from '../theme/ThemeProvider';
import ThemedView from './ui/ThemedView';
import ThemedText from './ui/ThemedText';
import ThemedButton from './ui/ThemedButton';

type Props = {
  book: Book;
  onPress: (book: Book) => void;
  onRemovePress?: (bookId: string) => void;
  showRemoveButton?: boolean;
};

const fallbackCover = 'https://via.placeholder.com/72x104?text=No+Cover';

export default function BookCard({
  book,
  onPress,
  onRemovePress,
  showRemoveButton,
}: Props) {
  const [imageError, setImageError] = useState(false);
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface }]}
      onPress={() => onPress(book)}
    >
      <Image
        source={{ uri: imageError ? fallbackCover : book.cover }}
        style={[styles.cover, { backgroundColor: colors.border }]}
        onError={() => setImageError(true)}
      />
      <ThemedView style={styles.content}>
        <ThemedText style={styles.title}>{book.title}</ThemedText>
        <ThemedText style={styles.meta}>{book.releaseDate}</ThemedText>
        <ThemedText style={styles.pages}>{book.pages} pages</ThemedText>
        {showRemoveButton && onRemovePress ? (
          <ThemedButton
            title="Remove"
            onPress={() => onRemovePress(book.id)}
            style={[styles.removeButton, { backgroundColor: colors.warning }]}
            textStyle={{ color: colors.surface }}
          />
        ) : null}
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,
  },
  cover: {
    width: 72,
    height: 104,
    borderRadius: 12,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  meta: {
    marginBottom: 8,
  },
  pages: {
    fontSize: 13,
  },
  removeButton: {
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 999,
  },
  removeText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
