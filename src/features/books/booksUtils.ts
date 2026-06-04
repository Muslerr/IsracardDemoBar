import { Book, BooksSortOption } from './booksTypes';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const normalizeString = (value: unknown): string =>
  typeof value === 'string' ? value : '';

const normalizeNumber = (value: unknown): number =>
  typeof value === 'number' && Number.isFinite(value) ? value : 0;

const parseBook = (item: unknown): Book | null => {
  if (!isRecord(item)) return null;

  const id = normalizeString(item.id) || normalizeString(item.title);
  const title = normalizeString(item.title);
  const releaseDate = normalizeString(item.releaseDate);
  const cover = normalizeString(item.cover);
  const description = normalizeString(item.description);
  const pages = normalizeNumber(item.pages);

  if (!id || !title) return null;

  return {
    id,
    title,
    releaseDate,
    cover,
    description,
    pages,
  };
};

export function normalizeBooksResponse(apiBooks: unknown): Book[] {
  if (!Array.isArray(apiBooks)) {
    return [];
  }

  return apiBooks
    .map(parseBook)
    .filter((book): book is Book => book !== null);
}

export function isBooksCacheValid(lastFetchedAt: number | null): boolean {
  if (lastFetchedAt === null) {
    return false;
  }

  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
  return Date.now() - lastFetchedAt < TWENTY_FOUR_HOURS;
}

export function filterBooksByTitle(books: Book[], query: string): Book[] {
  const search = query.trim().toLowerCase();
  if (!search) return books;

  return books.filter(book => book.title.toLowerCase().includes(search));
}

export function filterFavoriteBooks(books: Book[], query: string): Book[] {
  const search = query.trim().toLowerCase();
  if (!search) return books;

  return books.filter(
    book =>
      book.title.toLowerCase().includes(search) ||
      book.description.toLowerCase().includes(search),
  );
}

export function sortBooks(books: Book[], sortOption: BooksSortOption): Book[] {
  const sorted = [...books];

  switch (sortOption) {
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'pages':
      return sorted.sort((a, b) => a.pages - b.pages);
    case 'releaseDate':
      return sorted.sort(
        (a, b) =>
          new Date(a.releaseDate).getTime() -
          new Date(b.releaseDate).getTime(),
      );
    default:
      return books;
  }
}
