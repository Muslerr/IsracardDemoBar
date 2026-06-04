import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from './booksTypes';

export type BooksCacheState = {
  items: Book[];
  lastFetchedAt: number | null;
};

const initialState: BooksCacheState = {
  items: [],
  lastFetchedAt: null,
};

const booksCacheSlice = createSlice({
  name: 'booksCache',
  initialState,
  reducers: {
    setBooksCache(
      state,
      action: PayloadAction<{ items: Book[]; lastFetchedAt: number }>,
    ) {
      state.items = action.payload.items;
      state.lastFetchedAt = action.payload.lastFetchedAt;
    },
    clearBooksCache(state) {
      state.items = [];
      state.lastFetchedAt = null;
    },
  },
});

export const { setBooksCache, clearBooksCache } = booksCacheSlice.actions;
export default booksCacheSlice.reducer;
