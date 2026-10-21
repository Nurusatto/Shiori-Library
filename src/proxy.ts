import { type NextRequest, NextResponse } from "next/server";
import { createClientForMiddleware } from "@/shared/lib/supabase/middleware";

const isPathMatching = (
  routes: string[],
  prefixes: string[],
  pathname: string,
) => {
  const hasExactMatch = routes?.some((route) => route && route === pathname);
  const hasPrefixMatch = prefixes?.some(
    (prefix) => prefix && prefix.trim() !== "" && pathname.startsWith(prefix),
  );

  return hasExactMatch || hasPrefixMatch;
};

const protectedRoutes = ["/dashboard", "/profile", "/settings", "/AI"];
const protectedPrefixes: string[] = [];
const authRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { supabase, response } = createClientForMiddleware(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtectedRoute = isPathMatching(
    protectedRoutes,
    protectedPrefixes,
    pathname,
  );

  const isAuthRoute = isPathMatching(authRoutes, [], pathname);

  //  Незалогиненный идет на приватный роут
  if (!user && isProtectedRoute) {
    if (pathname === "/login") return response;

    const url = request.nextUrl.clone();
    url.pathname = "/login";

    const redirectResponse = NextResponse.redirect(url);
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });

    return redirectResponse;
  }

  if (user && isAuthRoute) {
    if (pathname === "/") return response;

    const url = request.nextUrl.clone();
    url.pathname = "/";

    const redirectResponse = NextResponse.redirect(url);
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });

    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
