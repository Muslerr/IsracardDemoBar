import type { RootState } from '../../app/store';

export const selectFavoriteById = (state: RootState, bookId: string) =>
  state.favorites.books.find(book => book.id === bookId);

export const selectFavoriteIds = (state: RootState) =>
  state.favorites.books.map(book => book.id);
