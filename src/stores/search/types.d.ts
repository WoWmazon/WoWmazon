type RecentSearchState = {
  recentSearch: string[];
  addRecentSearch: (search: string) => void;
  deleteRecentSearch: (search: string) => void;
  clearRecentSearch: () => void;
};

type SearchParamsState = {
  searchParams: SearchParamsType;
  setSearchParams: (key: string, value: string) => void;
};
