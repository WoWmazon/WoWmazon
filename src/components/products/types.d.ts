type productPostCardProps = {
  id: number;
  image: string;
  title: string;
  price: string;
  presentPrice: string;
  discountRate: number;
};
type OrderingType = "present_price" | "-discount_rate";

type ProductParamsType = {
  category_id?: number; // 카테고리 필터
  cursor?: string; // 페이지네이션 커서 값
  is_lowest_price_ever?: boolean; // 최저가 상품 여부 필터
  is_out_of_stock?: boolean; // 품절 상품 여부 필터
  ordering?: OrderingType; // 정렬 기준
  page_size?: number; // 페이지 당 결과 수
  search?: string; // 검색어
};

type ProductCategoryParamsType = {
  cursor?: string;
  page_size?: number;
};

type GetProductListResponse = {
  count: number;
  cursor: string;
  results: ProductResultType[];
};

type GetProductCategoryResponse = {
  count: number;
  cursor: string;
  results: ProductCategoryTypeId[];
};

type ProductCategoryTypeId = {
  id: number;
  enTitle: string;
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

type GetExchangeResponse = {
  usdToKrw: string;
  createdAt: string;
};

type CategorytButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

type DropdownProps = {
  initialValue?: string;
  categories: string[];
  onSelect: (category: string) => void;
};
