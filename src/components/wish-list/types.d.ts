type FavoriteProductParamsType = {
  cursor?: string; // 페이지네이션 커서 값
  ordering?: "product_priority" | "present_price" | "-discount_rate"; // 정렬 기준
  page_size?: number; // 페이지 당 결과 수
};

type GetFavoriteProductList = {
  count: number;
  cursor: string;
  results: FavoriteProductList[];
};

type FavoriteProductList = {
  id: number;
  product: FavoriteProduct;
  isAlarm: boolean;
};

type FavoriteProduct = Omit<
  ProductResultType,
  | "price"
  | "code"
  | "crawlingUpdatedAt"
  | "isFavorite"
  | "affiliateUrl"
  | "presentPriceUpdatedAt"
>;

type WishProductCardProps = FavoriteProduct & {
  favoriteId: number;
  isAlarm: boolean;
};

type PostProductResponse = {
  productId: number;
};

type DeleteAndPutProductResponse = {
  detail: string;
};

type WishListHeaderProps = {
  wishListNumber: number;
  openEdit: () => void;
};

type WishListProductCardPros = {
  children: React.ReactNode;
  isEditing: boolean;
  isChecked: boolean;
  onCheck: () => void;
};

type WishListProps = {
  products: Array<WishProductCardProps>;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isError: boolean;
  intersectionObserverRef: React.RefObject<HTMLDivElement>;
};

type WishListEditHeaderProps = {
  count: number;
  onClose: () => void;
};
