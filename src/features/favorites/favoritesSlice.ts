import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../books/booksTypes';

export type FavoritesState = {
  books: Book[];
};

const initialState: FavoritesState = {
  books: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Book>) {
      const exists = state.books.some(book => book.id === action.payload.id);
      if (!exists) {
        state.books.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    toggleFavorite(state, action: PayloadAction<Book>) {
      const exists = state.books.some(book => book.id === action.payload.id);
      if (exists) {
        state.books = state.books.filter(book => book.id !== action.payload.id);
      } else {
        state.books.push(action.payload);
      }
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
