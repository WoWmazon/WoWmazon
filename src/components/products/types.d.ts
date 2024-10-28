type productPostCardProps = {
  image: string;
  title: string;
  price: number;
  presentPrice: number;
  discountRate: number;
};

type ProductParamsType = {
  category_id?: number; // 카테고리 필터
  cursor?: string; // 페이지네이션 커서 값
  is_lowest_price_ever?: boolean; // 최저가 상품 여부 필터
  is_out_of_stock?: boolean; // 품절 상품 여부 필터
  ordering?: "present_price" | "discount_rate"; // 정렬 기준
  page_size?: number; // 페이지 당 결과 수
  search?: string; // 검색어
};

type getProductListResponse = {
  count: number;
  cursor: string;
  results: ProductResultType[];
};

type ProductResultType = {
  id: number;
  image: string;
  isOutOfStock: boolean;
  presentPrice: string;
  price: string;
  isLowestPriceEver: boolean;
  discountRate: number;
  code: string;
  crawlingUpdatedAt: string; // ISO date string
  isFavorite: boolean;
  affiliateUrl: string;
  isStopSelling: boolean;
  presentPriceUpdatedAt: string; // ISO date string
  title: string;
};
