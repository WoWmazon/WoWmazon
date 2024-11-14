import { isNull, isUndefined } from "@/utils/type-guard";
import { fetchWithToken } from "../fetchApi";
import { createQueryString } from "@/utils/apis/create-query-string";
import { fetchClient } from "@/utils/apis/fetch.client";

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

// product 상세
export const getProductDatail = async (id: string) => {
  try {
    const data = await fetchWithToken<GetProductDatailResponse>(
      `product/${id}/`
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
    const data = await fetchWithToken<GetProductDatailResponse>(
      `price_history/?period=${month}&product_id=${id}/`
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
      `product/${id}/price_info/`
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
    const data = await fetchWithToken<GetRelatedProductListResponse[]>(
      `product/${id}/related_product_list/`
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

export const getProductListBySearch = async (
  queryParams?: SearchParamsType
) => {
  const stringRecord = queryParams ? createQueryString(queryParams) : {};
  return fetchClient<GetProductListResponse>("product/", {}, stringRecord);
};
