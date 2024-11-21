"use server";

import { createQueryString } from "@/utils/apis/create-query-string";
import { fetchWithToken } from "../fetchApi";

// favorite product 목록 조회  GET /v1/favorite_product/
export const getFavoriteProduct = async (
  queryParams?: FavoriteProductParamsType
) => {
  let stringRecord: Record<string, string> = {};
  if (queryParams) {
    stringRecord = createQueryString(queryParams);
  }
  const data = await fetchWithToken<GetFavoriteProductResponse>(
    "favorite_product/",
    {},
    stringRecord
  );
  return data;
};

// favorite product 등록 (상품 찜하기 추가)  POST /v1/favorite_product/
export const postFavoriteProduct = async (productId: string) => {
  try {
    const data = await fetchWithToken<PostProductResponse>(
      "favorite_product/",
      {
        method: "POST",
        body: JSON.stringify({ productId }),
      }
    );
    return data;
  } catch (error) {
    console.log("에러 : ", error);
  }
};

// favorite product 삭제 (상품 찜하기 삭제)  DELETE /v1/favorite_product/delete_multiple/
export const deleteFavoriteProduct = async (productId: string) => {
  try {
    const data = await fetchWithToken<DeleteAndPutProductResponse>(
      `favorite_product/delete_multiple/?ids=${productId}`,
      {
        method: "DELETE",
      }
    );
    return data;
  } catch (error) {
    console.log("에러 : ", error);
  }
};

// favorite product 수정 (찜한 상품 알림여부 수정)  PUT /v1/favorite_product/{id}/
export const putFavoriteProduct = async (id: string, isAlarm: boolean) => {
  try {
    const data = await fetchWithToken<DeleteAndPutProductResponse>(
      `favorite_product/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ isAlarm }),
      }
    );
    return data;
  } catch (error) {
    console.log("에러 : ", error);
  }
};
