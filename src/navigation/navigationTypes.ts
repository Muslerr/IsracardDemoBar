export type MainTabsParamList = {
  Home: undefined;
  Favorites: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  BookDetails: {
    id: string;
    title: string;
    releaseDate: string;
    cover: string;
    description: string;
    pages: number;
  };
};
