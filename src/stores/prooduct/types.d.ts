type RecentKeywordsState = {
  recentKeyword: string[];
  add: (keyword: string) => void;
  delete: (keyword: string) => void;
  clear: () => void;
};

type SearchParamsState = {
  searchParams: SearchParamsType;
  setSearchParams: (key: string, value: string) => void;
};
