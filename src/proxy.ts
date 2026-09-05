import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "fr", "es", "de", "nl"] as const;
const DEFAULT_LOCALE = "en";

function getLocale(request: NextRequest): string {
  const accept = request.headers.get("accept-language") ?? "";
  const preferred = accept
    .split(",")
    .map((seg) => seg.split(";")[0].trim().toLowerCase());

  for (const tag of preferred) {
    if ((LOCALES as readonly string[]).includes(tag)) return tag;
    const base = tag.split("-")[0];
    if ((LOCALES as readonly string[]).includes(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = LOCALES.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const locale = pathname.split("/")[1];
    const response = NextResponse.next();
    response.headers.set("x-locale", locale);
    return response;
  }

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // woff2 added alongside the existing image extensions -- the
    // self-hosted Google Sans Flex files under /fonts/ were being caught
    // by this matcher and redirected to a nonexistent /<locale>/fonts/...
    // path (404), since fonts weren't a static-asset type this list knew
    // about yet.
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?)$).*)",
  ],
};
