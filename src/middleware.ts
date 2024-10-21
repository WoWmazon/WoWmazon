import { NextResponse, NextRequest } from "next/server";
import {
  fallbackLng,
  locales,
  LocaleTypes,
} from "./utils/localization/settings";
import { getCookie } from "./utils/cookie";
import { isUndefined } from "./utils/type-guard";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const newPathname =
    pathname === "" || pathname === "/" ? "/wish-list" : pathname;

  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  const isAuth = pathname.includes("auth"); // auth 페이지 인지 체크
  const isNotAuthorized = isUndefined(accessToken) && isUndefined(refreshToken); // 회원정보가 없는지 체크
  const isExpired = isUndefined(accessToken); // access token이 만료되었는지 체크

  // auth 페이지이고 회원정보가 있으면
  if (isAuth && !isNotAuthorized) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // auth 페이지가 아니고 회원정보가 없으면
  if (!isAuth && isNotAuthorized) {
    return NextResponse.redirect(new URL("/auth/preference", request.url));
  }

  // auth 페이지가 아니고 access token이 만료되었으면
  if (!isAuth && isExpired) {
    // 유저 리프레시
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/refresh`,
      {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({ refreshToken }),
      }
    );

    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      error,
    } = await res.json();

    if (!isUndefined(error)) {
      // 리프레시 실패
      const response = NextResponse.redirect(
        new URL("/auth/sign-in", request.url)
      );
      response.cookies.set("accessToken", "", {
        maxAge: 0,
      });

      return response;
    }

    const response = NextResponse.redirect(new URL("/", request.url));

    // 리프레시 성공, 쿠키 저장
    response.cookies.set("accessToken", newAccessToken);
    response.cookies.set("refreshToken", newRefreshToken);

    return response;
  }

  const pathSegments = pathname.split("/");
  const currentLocale = pathSegments[1] as LocaleTypes; // 첫번째 경로 세그먼트가 언어인지
  // if (currentLocale === fallbackLng) {
  //   const newPathName = pathSegments.slice(2).join("/") || "/";
  //   return NextResponse.redirect(new URL(newPathName, request.url));
  // }

  const pathnameIsMissingLocale = !locales.includes(currentLocale);
  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(`/${fallbackLng}${newPathname}`, request.url)
    );
  }

  return NextResponse.next();
}
// 특정경로에서 middleware 실행되지않도록 설정
export const config = {
  matcher: [
    "/((?!api|.*\\..*|_next/static|_next/image|manifest.json|assets|favicon.ico).*)",
  ],
};
