"use server";

import { fetchWithToken } from "../fetchApi";

//환율 api
export const getExchangeLatest = async () => {
  const data = await fetchWithToken<GetExchangeResponse>("exchange/latest/", {
    method: "GET",
    next: { revalidate: 18000 }, // 5시간
  });
  return data;
};
