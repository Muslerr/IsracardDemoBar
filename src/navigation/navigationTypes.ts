export type MainTabsParamList = {
  Home: undefined;
  Favorites: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  BookDetails: {
    bookId: string;
  };
};
