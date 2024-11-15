import { fetchServer } from "@/api/fetch.server";

export const postUserRefresh = async (refreshToken: string) => {
  return fetchServer("user/refresh/", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
    headers: {
      accept: "application/json",
    },
  });
};
