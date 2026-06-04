import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Book } from '../features/books/booksTypes';
import { colors, spacing } from '../theme';

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

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(book)}>
      <Image
        source={{ uri: imageError ? fallbackCover : book.cover }}
        style={styles.cover}
        onError={() => setImageError(true)}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.meta}>{book.releaseDate}</Text>
        <Text style={styles.pages}>{book.pages} pages</Text>
        {showRemoveButton && onRemovePress ? (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onRemovePress(book.id)}
          >
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: colors.surface,
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
    backgroundColor: colors.border,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  meta: {
    color: colors.muted,
    marginBottom: 8,
  },
  pages: {
    fontSize: 13,
    color: colors.text,
  },
  removeButton: {
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.warning,
  },
  removeText: {
    color: colors.surface,
    fontSize: 13,
    fontWeight: '600',
  },
});
