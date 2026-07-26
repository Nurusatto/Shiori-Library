import { type NextRequest, NextResponse } from "next/server";
import { createClientForMiddleware } from "@/shared/lib/supabase/middleware";

// Хелпер для безопасной проверки роутов
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

// 1. Точные приватные роуты
const protectedRoutes = ["/dashboard", "/profile", "/settings", "/AI"];

// 2. Префиксы приватных роутов
const protectedPrefixes = [""];

// 3. Страницы только для гостей
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { supabase, response } = createClientForMiddleware(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 4. Проверяем категории роутов через хелпер
  const isProtectedRoute = isPathMatching(
    protectedRoutes,
    protectedPrefixes,
    pathname,
  );

  const isAuthRoute = isPathMatching([], authRoutes, pathname);

  // 🔴 Сценарий 1: незалогиненный идет на приватную страницу
  if (!user && isProtectedRoute) {
    if (pathname === "/login") return response; // защита от петли

    const redirectResponse = NextResponse.redirect(
      new URL("/login", request.url),
    );

    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value);
    });

    return redirectResponse;
  }

  // 🟢 Сценарий 2: залогиненный идет на /login или /register
  if (user && isAuthRoute) {
    if (pathname === "/") return response; // защита от петли

    const redirectResponse = NextResponse.redirect(new URL("/", request.url));

    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value);
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
