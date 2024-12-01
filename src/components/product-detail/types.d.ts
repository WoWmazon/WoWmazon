type GetProductDetailResponse = ProductResultType & {
  favoriteId: number; // favorite product id
  isAlarm: boolean; // 찜한 상품 알림 여부
  optionStatus: boolean; // 옵션 상품 여부
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