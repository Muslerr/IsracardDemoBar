import { combineReducers } from '@reduxjs/toolkit';
import booksCacheReducer from '../features/books/booksCacheSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import preferencesReducer from '../features/preferences/preferencesSlice';
import { booksApi } from '../api/booksApi';

const rootReducer = combineReducers({
  booksCache: booksCacheReducer,
  favorites: favoritesReducer,
  preferences: preferencesReducer,
  [booksApi.reducerPath]: booksApi.reducer,
});

export default rootReducer;
