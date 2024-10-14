// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import { fallbackLng, locales } from "./utils/localization/settings";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 기본 언어 경로 처리
  if (
    pathname.startsWith(`/${fallbackLng}/`) ||
    pathname === `/${fallbackLng}`
  ) {
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${fallbackLng}`,
          pathname === `/${fallbackLng}` ? "/" : ""
        ),
        request.url
      )
    );
  }
// 경로에 언어가 없는 경우 처리
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(`/${fallbackLng}${pathname}`, request.url)
    );
  }
}
// 특정경로에서 middleware 실행되지않도록 설정
export const config = {
  matcher: [
    "/((?!api|.*\\..*|_next/static|_next/image|manifest.json|assets|favicon.ico).*)",
  ],
};
