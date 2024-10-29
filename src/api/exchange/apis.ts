"use server";

import { fetchWithToken } from "../fetchApi";

//환율 api
export const getExchangeLatest = async () => {
  try {
    const data = await fetchWithToken("exchange/latest/", {
      method: "GET",
      next: { revalidate: 18000 }, // 5시간
    });
    return data;
  } catch (error) {
    console.error("에러:", error);
    return [];
  }
};
