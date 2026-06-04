import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://potterapi-fedeperin.vercel.app/en/',
  }),
  endpoints: builder => ({
    getBooks: builder.query<unknown[], void>({
      query: () => 'books',
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;
