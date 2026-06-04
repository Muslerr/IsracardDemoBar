import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Book } from '../features/books/booksTypes';
import BookCard from './BookCard';
import EmptyState from './EmptyState';
import { spacing } from '../theme';

type Props = {
  books: Book[];
  onBookPress: (book: Book) => void;
  onRemovePress?: (bookId: string) => void;
  showRemoveButton?: boolean;
  viewMode?: 'list' | 'grid';
  emptyMessage?: string;
};

export default function BooksList({
  books,
  onBookPress,
  onRemovePress,
  showRemoveButton,
  emptyMessage,
}: Props) {
  const listRef = useRef<any>(null);

  useEffect(() => {
    if (books.length > 0) {
      listRef.current?.scrollToIndex({ index: 0, animated: false, viewPosition: 0 });
    }
  }, [books]);

  if (books.length === 0) {
    return <EmptyState message={emptyMessage ?? 'No books found.'} />;
  }

  return (
    <View style={styles.listContainer}>
      <FlashList
        key={`list-${books.length}`}
        ref={listRef}
        data={books}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={onBookPress}
            onRemovePress={onRemovePress}
            showRemoveButton={showRemoveButton}
          />
        )}
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
