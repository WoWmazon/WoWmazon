const NITO_BASE_URL = process.env.NEXT_PUBLIC_NITO_URL;

export const postUserRefresh = async (refreshToken: string) => {
  // refresh를 fetchServer로 요청할 시 오류가 나면 무한 요청이 발생함.
  // refresh 시 만료된 access token을 보내면 안 됨.
  return fetch(`${NITO_BASE_URL}/user/refresh/`, {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
