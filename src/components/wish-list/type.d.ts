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
  price | crawlingUpdatedAt | isFavorite | affiliateUrl | presentPriceUpdatedAt
>;

type FavoriteProductType = {
  id: number;
  image: string;
  presentPrice: string;
  isOutOfStock: boolean;
  discountRate: number;
  isStopSelling: boolean;
  title: string;
  isLowestPriceEver: boolean;
};

type WishProductCardProps = {
  favoriteId: number;
  isAlarm: boolean;
  id: number;
  image: string;
  // presentPrice: string;
  presentPrice: number;
  isOutOfStock: boolean;
  discountRate: number;
  isStopSelling: boolean;
  title: string;
  isLowestPriceEver: boolean;
};

type PostProductResponse = {
  productId: number;
};

type DeleteAndPutProductResponse = {
  detail: string;
};
