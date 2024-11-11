"use server";

import { fetchWithToken } from "../fetchApi";

// favorite product 목록 조회   /v1/favorite_product/
export const getFavoriteProduct = async (
  queryParams?: Record<string, string>
) => {
  try {
    const data = await fetchWithToken<GetFavoriteProductResponse>(
      "favorite_product/",
      {},
      queryParams
    );
    return data;
  } catch (error) {
    console.log("에러 : ", error);
  }
};

// favorite product 등록   /v1/favorite_product/
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

// favorite product 삭제   /v1/favorite_product/delete_multiple/
export const deleteFavoriteProduct = async (productId: string) => {
  try {
    const data = await fetchWithToken<DeleteAndPutProductResponse>(
      `favorite_product/delete_multiple/?ids=${productId}`,
      {
        method: "DELETE"
      }
    );
    return data;
  } catch (error) {
    console.log("에러 : ", error);
  }
};

// favorite product 수정   /v1/favorite_product/{id}/
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
