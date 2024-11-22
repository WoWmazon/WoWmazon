type RecentKeywordsState = {
  recentKeyword: string[];
  add: (keyword: string) => void;
  delete: (keyword: string) => void;
  clear: () => void;
};

//정섭님이 기존에 쓰던 타입
type SearchParamsState = {
  searchParams: SearchParamsType;
  setSearchParams: (key: string, value: string) => void;
};

//카테고리 필터 추가하여 bool값으로 만든것
type ProductParamsState = {
  searchParams: ProductParamsType;
  setSearchParams: (key: string, value: boolean | null | string) => void;
};

// 찜한 상품
type WishProductParamsState = {
  favoriteParams: FavoriteProductParamsType;
  setFavoriteParams: (key: string, value: string) => void;
};
