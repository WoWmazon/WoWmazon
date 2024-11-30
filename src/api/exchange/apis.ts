"use server";

import { fetchWithToken } from "../fetchApi";

//환율 api
export const getExchangeLatest = async () => {
  const data = await fetchWithToken<GetExchangeRateResponse>(
    "exchange/latest/",
    {
      next: { revalidate: 3600 }, // 1시간
    }
  );
  return data;
};
