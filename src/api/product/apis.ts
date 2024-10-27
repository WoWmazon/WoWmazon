"use server";
import { getCookie } from "@/utils/cookie";

const NITO_BASE_URL = process.env.NEXT_PUBLIC_NITO_URL;
const token = getCookie("accessToken");

// product 상세
export const getProductDatail = async (id: string) => {
  try {
    const url = `${NITO_BASE_URL}/product/${id}/`;
    console.log(url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("에러가 발생했습니다.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
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
export const getProductPriceInfo = async () => {
  const id = "127085";
  try {
    const response = await fetch(`${NITO_BASE_URL}/product/${id}/price_info`);
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
};

// 관련 product 목록 조회 GET /v1/product/{id}/related_product_list

export const getRelatedProductList = async () => {
  const id = "127085";
  try {
    const response = await fetch(`${NITO_BASE_URL}/product/${id}/price_info`);
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Unknown error occurred",
    };
  }
};
