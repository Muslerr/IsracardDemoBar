import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Book } from '../features/books/booksTypes';
import BookCard from './BookCard';
import EmptyState from './EmptyState';
import { spacing } from '../theme';

type Props = {
  books: Book[];
  onSelect: (book: Book) => void;
  emptyMessage?: string;
};

export default function BooksList({ books, onSelect, emptyMessage }: Props) {
  if (books.length === 0) {
    return <EmptyState message={emptyMessage ?? 'No books found.'} />;
  }

  return (
    <View style={styles.listContainer}>
      <FlashList
        data={books}
        renderItem={({ item }) => <BookCard book={item} onPress={onSelect} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.lg,
  },
});
