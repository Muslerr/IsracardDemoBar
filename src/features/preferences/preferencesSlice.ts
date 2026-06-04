import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PreferencesState = {
  language: 'en' | 'he';
  themeMode: 'system' | 'light' | 'dark';
  viewMode: 'list' | 'grid';
};

const initialState: PreferencesState = {
  language: 'en',
  themeMode: 'system',
  viewMode: 'list',
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<'en' | 'he'>) {
      state.language = action.payload;
    },
    setThemeMode(state, action: PayloadAction<'system' | 'light' | 'dark'>) {
      state.themeMode = action.payload;
    },
    setViewMode(state, action: PayloadAction<'list' | 'grid'>) {
      state.viewMode = action.payload;
    },
  },
});

export const { setLanguage, setThemeMode, setViewMode } =
  preferencesSlice.actions;
export default preferencesSlice.reducer;
