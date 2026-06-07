export type MainTabsParamList = {
  Home: undefined;
  Favorites: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  BookDetails: {
    bookId: string;
  };
};
