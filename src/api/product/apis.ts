"use server";

import { fetchWithToken } from "../fetchApi";

// 쿼리 파라미터 생성
// const queryParams = new URLSearchParams({
//   category_id: "1",
//   is_lowest_price_ever: "true",
//   is_out_of_stock: "false",
//   ordering: "present_price",
//   page_size: "1",
//   search: "bag",
// });

// 초기 productList를 불러오는 함수
export const getProductList = async (queryParams?: Record<string, string>) => {
  try {
    const data = await fetchWithToken("product/", "GET", {}, queryParams);
    return data.results;
  } catch (error) {
    console.error("에러:", error);
  }
};
