"use server";

import { NextResponse } from "next/server";
import { COOKIE_OPTIONS } from "@/constants/cookie";
import { postUserRefresh } from "@/services/user";
import { deleteCookie, getCookie, setCookie } from "@/utils/cookie";

const NITO_BASE_URL = process.env.NEXT_PUBLIC_NITO_URL;
// 토큰 갱신 시 무한 루프 방지를 위한 최대 재시도 횟수 설정
const MAX_RETRY_COUNT = 1;

export const fetchServer = async (
  endpoint: string,
  options?: RequestInit,
  retryCount = 0
): Promise<Response> => {
  try {
    const token = getCookie("accessToken");
    const requestHeaders: HeadersInit = new Headers({
      "Content-Type": "application/json",
      ...options?.headers,
    });

    // cookie에 accessToken이 있을 시 Authorization 추가
    if (token) {
      requestHeaders.set("Authorization", token);
    }

    // options에서 headers 삭제
    const optionsWithoutHeaders = { ...options };
    delete optionsWithoutHeaders.headers;

    const url = `${NITO_BASE_URL}/${endpoint}`;

    const response = await fetch(url, {
      headers: requestHeaders,
      credentials: "include", // 자격증명 포함
      ...optionsWithoutHeaders,
    });

    // 토큰 만료 시 재시도 (401, 444 상태 코드)
    if (response.status === 401 || response.status === 444) {
      if (retryCount >= MAX_RETRY_COUNT) {
        console.error("토큰 갱신 시도 초과");
        return NextResponse.json(
          { error: "Unauthorized or token refresh limit exceeded" },
          { status: 401 }
        );
      }

      // 토큰 갱신 요청
      const refreshToken = getCookie("refreshToken");
      const refreshResponse = await postUserRefresh(refreshToken!);

      if (!refreshResponse.ok) {
        console.error(
          `토큰 갱신 실패: ${refreshResponse.status}-${refreshResponse.statusText}`
        );
        if (refreshResponse.status < 500) {
          // 서버 오류가 아닐 시 refreshToken이 잘못 된 경우라서 토큰 초기화
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          deleteCookie("device");
        }
        return NextResponse.json(
          { error: "Token refresh failed" },
          { status: refreshResponse.status }
        );
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await refreshResponse.json();

      setCookie("accessToken", accessToken, COOKIE_OPTIONS);
      setCookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);

      return fetchServer(endpoint, options, retryCount + 1);
    }

    return response;
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error occurred" },
      { status: 500 }
    );
  }
};
