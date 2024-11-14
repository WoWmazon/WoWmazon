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
  const isNotAuthorized = isUndefined(accessToken); // 회원정보가 없는지 체크

  // auth 페이지이고 회원정보가 있으면
  if (isAuth && !isNotAuthorized) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // auth 페이지가 아니고 회원정보가 없으면
  if (!isAuth && isNotAuthorized) {
    return NextResponse.redirect(new URL("/auth/preference", request.url));
  }

  const pathSegments = pathname.split("/");
  const currentLocale = pathSegments[1] as LocaleTypes; // 첫번째 경로 세그먼트가 언어인지
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
