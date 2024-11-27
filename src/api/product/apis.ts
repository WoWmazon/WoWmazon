"use server";

import { isNull, isUndefined } from "@/utils/type-guard";
import { fetchWithToken } from "../fetchApi";
import { createQueryString } from "@/utils/apis/create-query-string";

// 초기 productList를 불러오는 함수
export const getProductList = async (queryParams?: ProductParamsType) => {
  let stringRecord: Record<string, string> = {};
  if (queryParams) {
    stringRecord = createQueryString(queryParams);
  }
  const data = await fetchWithToken<GetProductListResponse>(
    "product/",
    {},
    stringRecord
  );
  return data;
};

//카테고리 불어오는 함수
export const getCategoryId = async (
  queryParams?: ProductCategoryParamsType
) => {
  let stringRecord: Record<string, string> = {};
  if (queryParams) {
    stringRecord = createQueryString(queryParams);
  }
  const data = await fetchWithToken<GetProductCategoryResponse>(
    "category/",
    {},
    stringRecord
  );
  return data;
};

// product 상세 조회 GET /v1/product/{id}
export const getProductDetail = async (id: string) => {
  try {
    const data = await fetchWithToken<GetProductDetailResponse>(
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

// price history 목록 조회(가격 그래프) GET /v1/price_history/
export const getProductPriceGraph = async () => {
  const id = "127085";
  const month = "3";
  try {
    const data = await fetchWithToken<GetProductDetailResponse>(
      `price_history/?period=${month}&product_id=${id}/`,
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

// 상품 상세 가격 조회 GET /v1/product/{id}/price_info
export const getProductPriceInfo = async (id: string) => {
  try {
    const data = await fetchWithToken<GetProductInfoResponse>(
      `product/${id}/price_info/`,
      {
        method: "GET",
      }
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
    const data = await fetchWithToken<ProductResultType[]>(
      `product/${id}/related_product_list/`,
      {
        method: "GET",
      }
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
