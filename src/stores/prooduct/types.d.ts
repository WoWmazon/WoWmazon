type RecentKeywordsState = {
  recentKeyword: string[];
  add: (keyword: string) => void;
  delete: (keyword: string) => void;
  clear: () => void;
};

//카테고리 필터 추가하여 bool값으로 만든것
type ProductParamsState = {
  searchParams: ProductParamsType;
  setSearchParams: (key: string, value: boolean | string | undefined) => void;
};

// 찜한 상품
type WishProductParamsState = {
  favoriteParams: FavoriteProductParamsType;
  setFavoriteParams: (key: string, value: string) => void;
};

type WishEditState = {
  editList: number[];
  isEditing: boolean;
  setIsEditing: (flag: boolean) => void;
  isChecked: (id: number) => boolean;
  setEdit: (id: number) => void;
  deleteEdit: (id: number) => void;
  clearEditList: () => void;
};
