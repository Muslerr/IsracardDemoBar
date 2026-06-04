# PLAN.md — IsracardDemoBar React Native Assignment

This plan is optimized for finishing a safe MVP first, while leaving clean infrastructure for bonus features.

Assignment source: `מטלת בית React native ישראכרט.pdf`

---

## Final technical decision

Use:

- React Native CLI
- TypeScript
- React Navigation
- Redux Toolkit
- RTK Query
- Redux Persist
- AsyncStorage
- FlashList
- English-first UI
- Bonus-ready structure for i18n and dark mode

Do not use React Query for this assignment.

### Why RTK Query instead of React Query?

The assignment asks for Redux-related packages and persistence. The app also needs:

- API fetching
- local 24-hour cache
- persisted favorites
- clear global state
- easy explanation in README

RTK Query works naturally with Redux Toolkit and keeps the solution focused. React Query is also good, but adding it here would create two different state/cache systems and slow down the MVP.

### Recommended cache strategy

Use RTK Query only for the network request.

Persist the real 24-hour books cache in a dedicated Redux slice:

```ts
booksCache: {
  items: Book[];
  lastFetchedAt: number | null;
}
```

Flow:

1. App opens Home screen.
2. Check if `booksCache.items` exists and `lastFetchedAt` is younger than 24 hours.
3. If valid, show persisted books and skip API request.
4. If missing or expired, call RTK Query.
5. When RTK Query succeeds, save the normalized books and `lastFetchedAt` into Redux Persist.

This is easy to explain and satisfies the assignment directly.

---

# Execution rules

## Before coding

Create the project and immediately create a Git repo.

```bash
npx @react-native-community/cli@latest init IsracardDemoBar
cd IsracardDemoBar
git init
git add .
git commit -m "chore: initialize React Native CLI project"
```

## Work style

- One branch per feature.
- Small commits.
- Run the app after every meaningful feature.
- Do not start bonus work until MVP is complete.
- Keep every Copilot request narrow.
- Never ask Copilot to “build the whole app”.
- Ask Copilot to change specific files only.
- After Copilot writes code, review imports, types, and edge cases.

## Recommended branch order

```text
main
setup/dependencies
setup/structure
feature/navigation
feature/store
feature/books-api-cache
feature/home-list
feature/book-details
feature/favorites
feature/search
feature/sorting
polish/mvp-ui
docs/readme
bonus/i18n
bonus/dark-mode
bonus/grid-view
bonus/share
```

---

# MVP scope

The safe MVP is complete when:

- App runs on iOS.
- App runs on Android.
- Home tab displays books from the API.
- Books are stored for 24 hours.
- Each item shows title, release date, and cover.
- Pressing a book opens Book Details.
- Details show title, release date, cover, description, and pages.
- Book can be added to favorites.
- Favorites tab shows favorite books.
- Favorites persist after closing the app.
- Favorite books can be removed.
- Search exists on both tabs.
- Home search filters by title.
- Favorites search filters by title and description.
- Search uses debounce.
- Sorting works by title A-Z, pages, and release date.
- FlashList is used.
- README explains setup, architecture, cache strategy, and features.

---

# Session 1 — Project setup

## Goal

Create the React Native CLI project, install dependencies, and verify iOS/Android.

## Commands

```bash
npx @react-native-community/cli@latest init IsracardDemoBar
cd IsracardDemoBar

npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs

npm install @reduxjs/toolkit react-redux
npm install redux-persist @react-native-async-storage/async-storage

npm install @shopify/flash-list
npm install react-native-vector-icons

npx pod-install ios
```

## Verify

```bash
npm start
npm run ios
npm run android
```

## Deliverable

- Fresh app runs on iOS and Android.
- First commit exists.

## Git

```bash
git checkout -b setup/dependencies
git add .
git commit -m "chore: add navigation state and list dependencies"
```

## Copilot prompt

```text
We are building a React Native CLI TypeScript assignment app named IsracardDemoBar.
Do not implement screens yet.
Create a clean src folder structure for an app with:
- app store
- api
- components
- features/books
- features/favorites
- features/preferences
- hooks
- navigation
- screens
- theme
- utils

Add index/export files only where useful.
Keep the code minimal and TypeScript-friendly.
```

---

# Session 2 — Folder structure and base types

## Goal

Create the core types and base constants before UI.

## Files to create

```text
src/features/books/booksTypes.ts
src/features/books/booksUtils.ts
src/theme/colors.ts
src/theme/spacing.ts
src/theme/typography.ts
src/utils/dateUtils.ts
```

## Book model

```ts
export type Book = {
  id: string;
  title: string;
  releaseDate: string;
  cover: string;
  description: string;
  pages: number;
};
```

## Utility functions to prepare

```ts
normalizeBooksResponse(apiBooks: unknown): Book[]
isCacheValid(lastFetchedAt: number | null): boolean
filterBooksByTitle(books: Book[], query: string): Book[]
filterFavoriteBooks(books: Book[], query: string): Book[]
sortBooks(books: Book[], sortOption: BooksSortOption): Book[]
```

## Deliverable

- Types exist.
- Utility file exists.
- No UI depends on `any`.

## Git

```bash
git checkout -b setup/structure
git add .
git commit -m "chore: add base folder structure and book types"
```

## Copilot prompt

```text
Create the base TypeScript types and utilities for the books feature.

Create a Book type:
id: string
title: string
releaseDate: string
cover: string
description: string
pages: number

Create a BooksSortOption type:
'title' | 'pages' | 'releaseDate'

Create placeholder utility functions:
normalizeBooksResponse
isBooksCacheValid
filterBooksByTitle
filterFavoriteBooks
sortBooks

Do not add UI code yet.
Make the functions type-safe and avoid mutating arrays.
For now, normalizeBooksResponse should safely map unknown API data into Book[] and create a stable id if the API does not provide one.
```

---

# Session 3 — Navigation

## Goal

Create typed navigation with two tabs and a details screen.

## Structure

```text
RootStack
  MainTabs
    Home
    Favorites
  BookDetails
```

## Files

```text
src/navigation/navigationTypes.ts
src/navigation/MainTabs.tsx
src/navigation/RootNavigator.tsx
src/screens/HomeScreen.tsx
src/screens/FavoritesScreen.tsx
src/screens/BookDetailsScreen.tsx
```

## Deliverable

- App opens to Home tab.
- Favorites tab is visible.
- Details screen can be reached with fake data.
- Navigation params are typed.

## Git

```bash
git checkout -b feature/navigation
git add .
git commit -m "feat: add typed root stack and tabs navigation"
```

## Copilot prompt

```text
Implement typed React Navigation for this React Native TypeScript app.

Create:
- RootNavigator with Native Stack
- MainTabs with Bottom Tabs
- HomeScreen
- FavoritesScreen
- BookDetailsScreen

Navigation structure:
RootStack:
- MainTabs
- BookDetails with param { bookId: string }

Tabs:
- Home
- Favorites

Add placeholder screen content only.
Use TypeScript navigation types.
Update App.tsx to render RootNavigator inside NavigationContainer.
```

---

# Session 4 — Redux store and persistence

## Goal

Create the Redux store before data fetching.

## Files

```text
src/app/store.ts
src/app/rootReducer.ts
src/hooks/reduxHooks.ts
src/features/books/booksCacheSlice.ts
src/features/favorites/favoritesSlice.ts
src/features/preferences/preferencesSlice.ts
```

## State design

```ts
booksCache: {
  items: Book[];
  lastFetchedAt: number | null;
}

favorites: {
  books: Book[];
}

preferences: {
  language: 'en' | 'he';
  themeMode: 'system' | 'light' | 'dark';
  viewMode: 'list' | 'grid';
}
```

## Persistence

Whitelist these reducers:

```ts
['booksCache', 'favorites', 'preferences']
```

## Deliverable

- Redux Provider is wired in `App.tsx`.
- PersistGate is wired.
- Typed hooks exist:
  - `useAppDispatch`
  - `useAppSelector`

## Git

```bash
git checkout -b feature/store
git add .
git commit -m "feat: configure redux store with persistence"
```

## Copilot prompt

```text
Configure Redux Toolkit and Redux Persist for this React Native TypeScript app.

Create:
- rootReducer.ts
- store.ts
- typed Redux hooks
- booksCacheSlice
- favoritesSlice
- preferencesSlice

Use AsyncStorage for redux-persist.

State requirements:
booksCache stores persisted books and lastFetchedAt.
favorites stores full favorite Book objects so favorites work after app restart.
preferences stores language, themeMode and viewMode for future bonus features.

Add actions:
booksCache/setBooksCache
booksCache/clearBooksCache
favorites/addFavorite
favorites/removeFavorite
favorites/toggleFavorite
preferences/setLanguage
preferences/setThemeMode
preferences/setViewMode

Prevent duplicate favorites.
Update App.tsx to wrap the app with Provider and PersistGate.
```

---

# Session 5 — API and 24-hour cache

## Goal

Fetch books and persist them for 24 hours.

## Files

```text
src/api/booksApi.ts
src/features/books/booksCacheSlice.ts
src/features/books/booksUtils.ts
src/screens/HomeScreen.tsx
```

## API

```text
https://potterapi-fedeperin.vercel.app/en/books
```

## Logic

Home screen should:

1. Read persisted `booksCache.items`.
2. Read `booksCache.lastFetchedAt`.
3. Use `isBooksCacheValid(lastFetchedAt)`.
4. If valid and items exist, display cached items.
5. If not valid, call RTK Query.
6. When API data arrives, normalize it and save to books cache.
7. UI source of truth should be:
   - cached books if valid
   - API books after successful fetch
   - empty state if no books

## Cache utility

```ts
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

export const isBooksCacheValid = (lastFetchedAt: number | null) => {
  if (!lastFetchedAt) return false;
  return Date.now() - lastFetchedAt < TWENTY_FOUR_HOURS_MS;
};
```

## Deliverable

- Books are fetched.
- Books are saved with timestamp.
- Reopening app within 24 hours uses persisted cache.
- Expired cache triggers refetch.

## Git

```bash
git checkout -b feature/books-api-cache
git add .
git commit -m "feat: fetch and cache books for 24 hours"
```

## Copilot prompt

```text
Create the books API and 24-hour cache flow.

Use RTK Query for the network request to:
https://potterapi-fedeperin.vercel.app/en/books

Create booksApi.ts with createApi and fetchBaseQuery.

Use the existing booksCacheSlice for persistence.
Do not persist the RTK Query api slice directly.
Instead:
- HomeScreen reads booksCache from Redux.
- If cached books exist and lastFetchedAt is less than 24 hours old, skip API query.
- If cache is missing or expired, run the RTK Query request.
- On success, normalize the API response to Book[] and dispatch setBooksCache.

Add loading, error and retry handling.
Keep the code type-safe.
```

---

# Session 6 — Reusable UI components

## Goal

Build reusable list UI once, then use it in Home and Favorites.

## Files

```text
src/components/BookCard.tsx
src/components/BooksList.tsx
src/components/SearchBar.tsx
src/components/SortMenu.tsx
src/components/LoadingState.tsx
src/components/ErrorState.tsx
src/components/EmptyState.tsx
src/components/ScreenContainer.tsx
```

## BookCard required fields

- cover
- title
- releaseDate

## BooksList

Use FlashList.

Props:

```ts
type BooksListProps = {
  books: Book[];
  onBookPress: (book: Book) => void;
  onRemovePress?: (bookId: string) => void;
  showRemoveButton?: boolean;
  viewMode?: 'list' | 'grid';
};
```

For MVP, use list mode only. Keep `viewMode` prop ready for grid bonus.

## Deliverable

- Reusable components compile.
- UI is clean enough.
- FlashList is used.

## Git

```bash
git checkout -b feature/home-list
git add .
git commit -m "feat: add reusable book list components"
```

## Copilot prompt

```text
Create reusable React Native TypeScript components for the books app.

Components:
- ScreenContainer
- LoadingState
- ErrorState with retry button
- EmptyState
- BookCard
- BooksList using FlashList

BookCard should show:
- cover image
- title
- releaseDate

BooksList props:
books
onBookPress
onRemovePress optional
showRemoveButton optional
viewMode optional with 'list' | 'grid'

For now implement list layout, but keep the viewMode prop so grid mode can be added later.
Use clean StyleSheet styles.
Add image fallback handling if cover fails.
```

---

# Session 7 — Home screen

## Goal

Connect real books data to reusable UI.

## Tasks

1. Use the 24-hour cache flow.
2. Render books using `BooksList`.
3. Navigate to details on item press.
4. Add loading/error/empty states.

## Deliverable

- Home screen fully works.
- User can open details screen from a book.

## Git

```bash
git add .
git commit -m "feat: display cached API books on home screen"
```

## Copilot prompt

```text
Update HomeScreen to use the books cache and API flow.

Requirements:
- Read booksCache from Redux.
- Use the RTK Query hook only when cache is missing or expired.
- Save successful API results into booksCache.
- Display LoadingState, ErrorState, EmptyState and BooksList.
- Use BooksList to render books.
- Pressing a book navigates to BookDetails with bookId.
- Keep the screen clean and readable.
```

---

# Session 8 — Book details

## Goal

Show full book data and favorite toggle.

## Files

```text
src/screens/BookDetailsScreen.tsx
src/features/favorites/favoritesSelectors.ts
```

## Data lookup order

1. Try books cache by `bookId`.
2. Try favorites by `bookId`.
3. If not found, show error state.

This matters because a favorite should still open after restart.

## Deliverable

- Details screen shows all required fields.
- Favorite toggle works.
- Works from both Home and Favorites.

## Git

```bash
git checkout -b feature/book-details
git add .
git commit -m "feat: add book details and favorite toggle"
```

## Copilot prompt

```text
Implement BookDetailsScreen.

It receives bookId from React Navigation params.
Find the book by id from:
1. booksCache.items
2. favorites.books

Display:
- cover
- title
- releaseDate
- description
- pages

Add a button that toggles favorite state using favoritesSlice.
The button should display:
- Add to favorites
- Remove from favorites

If the book is not found, show ErrorState or EmptyState.
Keep styles clean.
```

---

# Session 9 — Favorites screen

## Goal

Display and manage favorites.

## Tasks

1. Read `favorites.books`.
2. Display them with `BooksList`.
3. Navigate to details on press.
4. Allow remove from favorites directly.
5. Show empty state.

## Deliverable

- Favorites tab works.
- Favorites persist.
- Favorite removal works.
- Details navigation works.

## Git

```bash
git checkout -b feature/favorites
git add .
git commit -m "feat: display and manage favorite books"
```

## Copilot prompt

```text
Implement FavoritesScreen.

Requirements:
- Read favorites.books from Redux.
- Render the books with BooksList.
- Pressing a favorite opens BookDetails with bookId.
- Show a remove button for each favorite.
- Remove button dispatches removeFavorite(bookId).
- Show EmptyState when there are no favorites.
```

---

# Session 10 — Debounced search

## Goal

Add search to Home and Favorites.

## Files

```text
src/hooks/useDebounce.ts
src/components/SearchBar.tsx
src/features/books/booksUtils.ts
src/screens/HomeScreen.tsx
src/screens/FavoritesScreen.tsx
```

## Logic

Home:

```ts
filterBooksByTitle(books, debouncedSearch)
```

Favorites:

```ts
filterFavoriteBooks(favorites, debouncedSearch)
```

Favorites search checks:

- title
- description

## Deliverable

- Search bar appears in both tabs.
- Search waits before filtering.
- Search is case-insensitive.
- Search and list rendering still work smoothly.

## Git

```bash
git checkout -b feature/search
git add .
git commit -m "feat: add debounced search to home and favorites"
```

## Copilot prompt

```text
Add debounced search to the app.

Create useDebounce hook:
- generic
- default delay around 400ms
- cleanup timeout on value change

Update SearchBar component if needed.

HomeScreen:
- local search state
- debounced search value
- filter books by title only

FavoritesScreen:
- local search state
- debounced search value
- filter favorites by title and description

Filtering should be case-insensitive.
Do not mutate arrays.
```

---

# Session 11 — Sorting

## Goal

Add required sorting to book lists.

## Sort options

- Title A-Z
- Pages
- Release date

## Files

```text
src/components/SortMenu.tsx
src/features/books/booksUtils.ts
src/screens/HomeScreen.tsx
src/screens/FavoritesScreen.tsx
```

## Logic order

Always apply:

```text
raw books -> search filter -> sort -> render
```

## Deliverable

- Sort menu exists.
- Sorting works in Home.
- Sorting works in Favorites.
- Sorting combines correctly with search.

## Git

```bash
git checkout -b feature/sorting
git add .
git commit -m "feat: add sorting by title pages and release date"
```

## Copilot prompt

```text
Add sorting support.

Create or complete sortBooks in booksUtils.
Supported sort options:
- title
- pages
- releaseDate

Rules:
- title sorts A-Z using localeCompare
- pages sorts ascending
- releaseDate sorts ascending by parsed date
- never mutate the input array

Create a simple SortMenu component using Pressable buttons or a basic dropdown-like UI.
Use it in HomeScreen and FavoritesScreen.

The render flow must be:
books -> filtered by search -> sorted -> BooksList.
```

---

# Session 12 — MVP polish

## Goal

Make the required app submission-ready.

## Checklist

- Remove unused imports.
- Remove debug console logs.
- Check TypeScript errors.
- Check iOS.
- Check Android.
- Check app restart persistence.
- Check API retry.
- Check empty states.
- Check image fallback.
- Check README.

## Commands

```bash
npm run lint
npm test
npm run ios
npm run android
```

Some fresh React Native projects may not include all scripts. Use the scripts that exist in `package.json`.

## Git

```bash
git checkout -b polish/mvp-ui
git add .
git commit -m "polish: finalize required app UI and states"
```

## Copilot prompt

```text
Review the current React Native app for MVP polish.

Look for:
- unused imports
- unsafe any types
- duplicated code
- missing loading states
- missing empty states
- missing error states
- inconsistent styles
- possible crashes when book data is missing
- image loading failures

Make small safe improvements only.
Do not add new features.
Do not change the architecture.
```

---

# Session 13 — README

## Goal

Submit a GitHub repo that is easy to understand.

## README sections

```md
# IsracardDemoBar

## Description

## Tech Stack

## Features

## Project Structure

## Setup

## Running iOS

## Running Android

## State Management

## 24-Hour Cache Strategy

## Favorites Persistence

## Search and Sorting

## Bonus Features

## Known Limitations
```

## Git

```bash
git checkout -b docs/readme
git add .
git commit -m "docs: add setup architecture and cache strategy"
```

## Copilot prompt

```text
Create a professional README for this React Native assignment app.

Include:
- project description
- tech stack
- features
- setup commands
- iOS run commands
- Android run commands
- folder structure
- state management explanation
- 24-hour cache strategy explanation
- favorites persistence explanation
- search and sorting explanation
- bonus features section
- known limitations section

Make it clear and concise for a code reviewer.
```

---

# Bonus infrastructure after MVP

Only continue here after all MVP requirements work.

---

## Bonus A — Hebrew support

### Goal

Add i18n after English UI is stable.

### Files

```text
src/i18n/index.ts
src/i18n/locales/en.json
src/i18n/locales/he.json
```

### Packages

```bash
npm install i18next react-i18next
```

### Deliverable

- English and Hebrew strings.
- Simple language toggle.
- Persist selected language in preferences.

### Git

```bash
git checkout -b bonus/i18n
git add .
git commit -m "feat: add English and Hebrew language support"
```

### Copilot prompt

```text
Add i18n support to this React Native app using i18next and react-i18next.

Requirements:
- Create en.json and he.json translation files.
- English is the default language.
- Hebrew is available as a second language.
- Replace hardcoded UI strings in screens and reusable components.
- Use preferences.language from Redux to persist the selected language.
- Add a simple language toggle in a reasonable place, such as the Home screen header or Settings-like area.
- Keep RTL handling minimal and safe. Do not redesign the UI.
```

---

## Bonus B — Dark mode infrastructure

### Goal

Add dark mode without rewriting screens.

### Deliverable

- Theme object supports light/dark.
- Components use theme colors.
- System mode works.
- Optional manual mode persists.

### Git

```bash
git checkout -b bonus/dark-mode
git add .
git commit -m "feat: add dark mode support"
```

### Copilot prompt

```text
Add dark mode support.

Use React Native useColorScheme and the existing preferences.themeMode.
themeMode options:
- system
- light
- dark

Create a useAppTheme hook that returns the correct color palette.
Update ScreenContainer, BookCard, SearchBar, SortMenu, LoadingState, ErrorState, EmptyState, HomeScreen, FavoritesScreen and BookDetailsScreen to use theme colors.
Keep the visual changes simple.
```

---

## Bonus C — Grid/list toggle

### Goal

Finish the infrastructure already prepared with `viewMode`.

### Deliverable

- Toggle between list and grid.
- Grid uses two columns.
- Persist selected view mode.

### Git

```bash
git checkout -b bonus/grid-view
git add .
git commit -m "feat: add list and grid view toggle"
```

### Copilot prompt

```text
Finish the grid/list view bonus.

Use preferences.viewMode from Redux.
BooksList already has a viewMode prop.
In list mode, render one item per row.
In grid mode, render two columns using FlashList numColumns.
Add a toggle button in HomeScreen and FavoritesScreen.
Persist the selected view mode.
Make sure item press and remove favorite still work.
```

---

## Bonus D — Share

### Goal

Add a share button to details.

### Deliverable

- Share button shares title, description, and cover URL.

### Git

```bash
git checkout -b bonus/share
git add .
git commit -m "feat: add book sharing"
```

### Copilot prompt

```text
Add a Share button to BookDetailsScreen.

Use React Native Share API.
When pressed, share:
- book title
- book description
- cover image URL

Handle errors safely.
Keep the button style consistent with the favorite button.
```

---

# Final Git cleanup

Before submitting:

```bash
git status
git log --oneline --decorate --graph --all
```

Merge to main:

```bash
git checkout main
git merge setup/dependencies
git merge setup/structure
git merge feature/navigation
git merge feature/store
git merge feature/books-api-cache
git merge feature/home-list
git merge feature/book-details
git merge feature/favorites
git merge feature/search
git merge feature/sorting
git merge polish/mvp-ui
git merge docs/readme
```

If you used PRs in GitHub, merge through GitHub instead.

---

# Final QA checklist

## Home

- [ ] Home tab loads.
- [ ] Books are displayed.
- [ ] Each book shows cover, title, release date.
- [ ] FlashList is used.
- [ ] Search filters by title.
- [ ] Search is debounced.
- [ ] Sort by title works.
- [ ] Sort by pages works.
- [ ] Sort by release date works.
- [ ] Pressing book opens details.

## Details

- [ ] Shows cover.
- [ ] Shows title.
- [ ] Shows release date.
- [ ] Shows description.
- [ ] Shows pages.
- [ ] Favorite button works.
- [ ] Button state changes correctly.

## Favorites

- [ ] Favorites tab loads.
- [ ] Added favorites appear.
- [ ] Favorites persist after app restart.
- [ ] Favorite can be removed.
- [ ] Search filters by title.
- [ ] Search filters by description.
- [ ] Search is debounced.
- [ ] Sort works.
- [ ] Pressing favorite opens details.

## Cache

- [ ] Books are saved after API success.
- [ ] App uses cached books within 24 hours.
- [ ] Expired cache triggers refetch.
- [ ] README explains cache strategy.

## Submission

- [ ] App runs on iOS.
- [ ] App runs on Android.
- [ ] README exists.
- [ ] GitHub repo is clean.
- [ ] No obvious console errors.
- [ ] No unused files.
- [ ] Bonus features are documented if added.

---

# How to use this plan with GitHub Copilot

For every session:

1. Open the relevant files in VS Code.
2. Paste the session prompt into Copilot Chat.
3. Tell Copilot: “Only modify the files needed for this session.”
4. Review generated code.
5. Run the app.
6. Fix TypeScript/import errors.
7. Commit.
8. Move to the next session.

Use this extra instruction often:

```text
Before changing code, explain the files you plan to edit.
After changing code, summarize exactly what changed and mention any manual steps I need to run.
```

---

# Best checkpoint messages to send ChatGPT during execution

Use these when you want help while coding:

```text
I finished Session X. Here are the files changed and the error/output I see. Check if I should move on or fix something first.
```

```text
Here is my current HomeScreen and booksApi. Verify that the 24-hour cache logic really satisfies the assignment.
```

```text
Here is my favoritesSlice and BookDetailsScreen. Check if favorites persistence will work after app restart.
```

```text
Here is my README. Make it sound professional for a React Native assignment reviewer.
```
