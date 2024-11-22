"use server";

import { createURLWithParams } from "@/utils/apis/create-URL-Params";
import { getValidAccessToken } from "@/auth/token";

const NITO_BASE_URL = process.env.NEXT_PUBLIC_NITO_URL;

export const fetchWithToken = async <T>(
  endpoint: string,
  options: RequestInit = {},
  queryParams?: Record<string, string> // 쿼리 파라미터를 위한 인수 추가
): Promise<T> => {
  const url = createURLWithParams(`${NITO_BASE_URL}`, endpoint, queryParams);

  const token = await getValidAccessToken();

  if (!token) {
    throw new Error();
  }
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers, // 추가 헤더 병합
    },
    credentials: "include", // 자격증명 포함
    ...options,
  });
  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.statusText}`);
  }
  return response.json() as T;
};

// token 값 필요없을 때 fetch 함수
export const fetchWithoutToken = async (
  endpoint: string,
  options: RequestInit,
  queryParams?: Record<string, string>
) => {
  //쿼리파라미터가 있을때 url 처리
  const url = createURLWithParams(`${NITO_BASE_URL}`, endpoint, queryParams);

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  });

  return response;
};
