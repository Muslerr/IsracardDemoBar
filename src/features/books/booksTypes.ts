export type Book = {
  id: string;
  title: string;
  releaseDate: string;
  cover: string;
  description: string;
  pages: number;
};

export type BooksSortOption = 'title' | 'pages' | 'releaseDate';
