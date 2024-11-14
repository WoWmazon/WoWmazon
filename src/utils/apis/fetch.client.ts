import { createURLWithParams } from "@/utils/apis/create-URL-Params";

const DOMAIN_BASE_URL = process.env.NEXT_PUBLIC_DOMAIN_URL;

export const fetchClient = async <T>(
  endpoint: string,
  options?: RequestInit,
  queryParams?: Record<string, string> // 쿼리 파라미터를 위한 인수 추가
) => {
  try {
    const requestHeaders: HeadersInit = new Headers({
      "Content-Type": "application/json",
      ...options?.headers,
    });

    // options에서 headers 삭제
    const optionsWithoutHeaders = { ...options };
    delete optionsWithoutHeaders.headers;

    const url = createURLWithParams(
      `${DOMAIN_BASE_URL}/api`,
      endpoint,
      queryParams
    );

    const response = await fetch(url, {
      headers: requestHeaders,
      credentials: "include", // 자격증명 포함
      ...optionsWithoutHeaders,
    });

    if (!response.ok) {
      throw new Error(
        `API 요청 실패: ${response.status} - ${response.statusText}`
      );
    }

    return (await response.json()) as T;
  } catch (e) {
    throw new Error(
      e instanceof Error ? e.message : "Unknown fetch error occurred"
    );
  }
};
