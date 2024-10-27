"use server";

import { isNull, isUndefined } from "@/utils/type-guard";
import { fetchWithToken } from "../fetchApi";
import { getCookie } from "@/utils/cookie";

const NITO_BASE_URL = process.env.NEXT_PUBLIC_NITO_URL;
const token = getCookie("accessToken");

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
    const data = await fetchWithToken(
      "product/",
      {
        method: "GET",
      },
      queryParams
    );
    if (isUndefined(data) || isNull(data) || isUndefined(data.results)) {
      console.log("상품 데이터가 비어있습니다.");
      return [];
    }
    return data.results;
  } catch (error) {
    console.error("에러:", error);
    return [];
  }
};

// product 상세
export const getProductDatail = async (id: string) => {
  try {
    const data = await fetchWithToken<GetProductDatailResponse>(
      `product/${id}/`,
      {
        method: "GET",
      }
    );
    if (isUndefined(data) || isNull(data)) {
      console.log("상품 데이터가 비어있습니다.");
      return undefined;
    }
    return data;
  } catch (error) {
    console.log("에러 : ", error);
  }
};

// price history 목록 조회(가격 그래프) GET /v1/price_history
export const getProductPriceGraph = async () => {
  const id = "127085";
  const month = "3";
  try {
    const response = await fetch(
      `${NITO_BASE_URL}/price_history/?period=${month}&product_id=${id}`
    );
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
};

// 상품 상세 가격 조회 GET /v1/product/{id}/price_info
export const getProductPriceInfo = async (id: string) => {
  try {
    const data = await fetchWithToken<GetProductInfoResponse>(
      `product/${id}/price_info/`,
      { method: "GET" }
    );
    if (isUndefined(data) || isNull(data)) {
      console.log("데이터가 비어있습니다.");
      return undefined;
    }
    return data;
  } catch (error) {
    console.log("에러 : ", error);
  }
};

// 관련 product 목록 조회 GET /v1/product/{id}/related_product_list

export const getRelatedProductList = async (id: string) => {
  try {
    const data = await fetchWithToken(`product/${id}/related_product_list/`, {
      method: "GET",
    });
    console.log(data);
    if (isUndefined(data) || isNull(data)) {
      console.log("데이터가 비어있습니다.");
      return undefined;
    }
    return data;
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
};
