import { combineReducers } from '@reduxjs/toolkit';
import booksCacheReducer from '../features/books/booksCacheSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import preferencesReducer from '../features/preferences/preferencesSlice';

const rootReducer = combineReducers({
  booksCache: booksCacheReducer,
  favorites: favoritesReducer,
  preferences: preferencesReducer,
});

export default rootReducer;
