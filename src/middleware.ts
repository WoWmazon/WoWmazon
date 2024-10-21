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

  const isAuth = pathname.includes("auth");
  const isNotAuthorized = isUndefined(accessToken) && isUndefined(refreshToken);
  const isExpired = isUndefined(accessToken);

  if (isAuth && !isNotAuthorized) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isNotAuthorized && !isAuth) {
    return NextResponse.redirect(new URL("/auth/preference", request.url));
  }

  if (isExpired) {
    // 유저 리프레시
    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      error,
    } = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/refresh`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({ refreshToken }),
    }).then((res) => res.json());

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

    const response = NextResponse.next();

    // 리프레시 성공
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
