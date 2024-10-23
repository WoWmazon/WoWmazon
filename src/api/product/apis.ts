"use server";
import { getCookie } from "@/utils/cookie";

const NITO_BASE_URL = process.env.NEXT_PUBLIC_NITO_URL;
const token = getCookie("accessToken");
export const getProductList = async () => {
  try {
    // 쿼리 파라미터 생성
    // const queryParams = new URLSearchParams({
    //   category_id: "1",
    //   is_lowest_price_ever: "true",
    //   is_out_of_stock: "false",
    //   ordering: "present_price",
    //   page_size: "1",
    //   search: "bag",
    // });

    const url = `${NITO_BASE_URL}/product/`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("에러가 발생했어요!");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("에러", error);
  }
};
