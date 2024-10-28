import { fetchWithToken } from "../fetchApi";

//환율 api
export const getExchangeLatest = async () => {
  try {
    const data = await fetchWithToken("exchange/latest/", {
      method: "GET",
    });
    return data;
  } catch (error) {
    console.error("에러:", error);
    return [];
  }
};
