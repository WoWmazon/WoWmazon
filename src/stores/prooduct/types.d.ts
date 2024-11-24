type RecentKeywordsState = {
  recentKeyword: string[];
  add: (keyword: string) => void;
  delete: (keyword: string) => void;
  clear: () => void;
};

//카테고리 필터 추가하여 bool값으로 만든것
type ProductParamsState = {
  searchParams: ProductParamsType;
  setSearchParams: (key: string, value: boolean | null | string) => void;
};
