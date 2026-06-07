import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Book } from '../features/books/booksTypes';
import BookCard from './BookCard';
import EmptyState from './EmptyState';
import ThemedView from './ui/ThemedView';
import { spacing } from '../theme';

type Props = {
  books: Book[];
  onBookPress: (book: Book) => void;
  onRemovePress?: (bookId: string) => void;
  showRemoveButton?: boolean;
  emptyMessage?: string;
  viewMode?: 'list' | 'grid';
};

export default function BooksList({
  books,
  onBookPress,
  onRemovePress,
  showRemoveButton,
  emptyMessage,
  viewMode = 'list',
}: Props) {
  const listRef = useRef<any>(null);
  const numColumns = viewMode === 'grid' ? 2 : 1;

  useEffect(() => {
    if (books.length > 0) {
      listRef.current?.scrollToIndex({ index: 0, animated: false, viewPosition: 0 });
    }
  }, [books]);

  if (books.length === 0) {
    return <EmptyState message={emptyMessage ?? 'No books found.'} />;
  }

  return (
    <ThemedView style={styles.listContainer}>
      <FlashList
        key={`list-${books.length}-${viewMode}`}
        ref={listRef}
        data={books}
        numColumns={numColumns}
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
    </ThemedView>
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
