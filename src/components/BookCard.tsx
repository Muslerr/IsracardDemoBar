import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Book } from '../features/books/booksTypes';
import { colors, spacing } from '../theme';

type Props = {
  book: Book;
  onPress: (book: Book) => void;
};

export default function BookCard({ book, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(book)}>
      <Image source={{ uri: book.cover }} style={styles.cover} />
      <View style={styles.content}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.meta}>{book.releaseDate}</Text>
        <Text style={styles.pages}>{book.pages} pages</Text>
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
});
