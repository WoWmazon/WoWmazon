type GetProductDatailResponse = {
  id: string; // 상품 ID
  image: string; // 상품 이미지
  isOutOfStock: boolean; // 품절 여부
  presentPrice: number; // 현재가
  price: number; // 원가
  isLowestPriceEver: boolean; // 역대 최저가 상품 여부
  discountRate: number; // 할인율
  code: string; // 아마존 상품 코드
  crawlingUpdatedAt: string; // 최근 크롤링일자 (?)
  isFavorite: boolean; // 찜한 상품 여부
  affiliateUrl: string; // 아마존 어필리에이트 url
  isStopSelling: boolean; // 판매 중지 상품 여부
  presentPriceUpdatedAt: string; // 현재가 갱신 날짜
  favoriteId: number; // favorite product id
  isAlarm: boolean; // 찜한 상품 알림 여부
  optionStatus: boolean; // 옵션 상품 여부
  title: string; // 상품명
};

type GetProductInfoResponse = {
  id: string; // 상품 ID
  presentPrice: number; // 현재가
  lowPrice: number; // 최저가
  highPrice: number; // 최고가
  lowPriceUpdatedAt: string; // 최저가 갱신 날짜
  highPriceUpdatedAt: string; // 최고가 갱신 날짜
  presentPriceUpdatedAt: string; // 현재가 갱신 날짜
  averagePrice: number; // 평균가
};

type GetRelatedProductListResponse = {
  id: string; // 상품 ID
  image: string; // 상품 이미지
  isOutOfStock: boolean; // 품절 여부
  presentPrice: number; // 현재가
  price: number; // 원가
  isLowestPriceEver: boolean; // 역대 최저가 상품 여부
  discountRate: number; // 할인율
  code: string; // 아마존 상품 코드
  crawlingUpdatedAt: string; // 최근 크롤링일자 (?)
  isFavorite: boolean; // 찜한 상품 여부
  affiliateUrl: string; // 아마존 어필리에이트 url
  isStopSelling: boolean; // 판매 중지 상품 여부
  presentPriceUpdatedAt: string; // 현재가 갱신 날짜
  title: string; // 상품명
};
