type FavoriteProductParamsType = {
  cursor?: string; // 페이지네이션 커서 값
  ordering?: "product_priority" | "present_price" | "-discount_rate"; // 정렬 기준
  page_size?: number; // 페이지 당 결과 수
};

type GetFavoritProductList = {
  count: number;
  cursor: string;
  results: FavoriteResultType[];
};

type FavoriteResultType = {
  id: number;
  isAlarm: boolean;
  product: FavoriteProductType[];
};

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
  wishId: number;
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
