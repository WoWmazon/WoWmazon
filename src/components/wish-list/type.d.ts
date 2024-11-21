type FavoriteProductParamsType = {
  cursor?: string; // 페이지네이션 커서 값
  ordering?: "product_priority" | "present_price" | "-discount_rate"; // 정렬 기준
  page_size?: number; // 페이지 당 결과 수
};
