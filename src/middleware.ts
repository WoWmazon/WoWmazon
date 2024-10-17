import { NextResponse, NextRequest } from "next/server";
import {
  fallbackLng,
  locales,
  LocaleTypes,
} from "./utils/localization/settings";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathSegments = pathname.split("/");
  const currentLocale = pathSegments[1] as LocaleTypes; // 첫번째 경로 세그먼트가 언어인지
  // if (currentLocale === fallbackLng) {
  //   const newPathName = pathSegments.slice(2).join("/") || "/";
  //   return NextResponse.redirect(new URL(newPathName, request.url));
  // }
  const pathnameIsMissingLocale = !locales.includes(currentLocale);
  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(`/${fallbackLng}${pathname}`, request.url)
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
