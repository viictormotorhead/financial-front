import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  AUTH_API_PREFIX,
  AUTH_COOKIE_NAME,
  BACKEND_PROXY_PREFIX,
  PUBLIC_PATHS,
} from "@/lib/auth/constants";

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function isAuthApiPath(pathname: string): boolean {
  return pathname.startsWith(AUTH_API_PREFIX);
}

function hasSession(request: NextRequest): boolean {
  return Boolean(request.cookies.get(AUTH_COOKIE_NAME)?.value);
}

function safeCallbackUrl(callbackUrl: string | null): string | null {
  if (
    callbackUrl &&
    callbackUrl.startsWith("/") &&
    !callbackUrl.startsWith("//")
  ) {
    return callbackUrl;
  }
  return null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = hasSession(request);

  if (isAuthApiPath(pathname)) {
    if (pathname === `${AUTH_API_PREFIX}/login` && request.method === "POST") {
      return NextResponse.next();
    }
    if (pathname === `${AUTH_API_PREFIX}/logout` && request.method === "POST") {
      return NextResponse.next();
    }
  }

  if (pathname.startsWith(BACKEND_PROXY_PREFIX) && !authenticated) {
    return NextResponse.json(
      { status: "error", message: "No autorizado", data: null },
      { status: 401 },
    );
  }

  if (isPublicPath(pathname)) {
    if (authenticated && pathname === "/login") {
      const destination =
        safeCallbackUrl(request.nextUrl.searchParams.get("callbackUrl")) ??
        "/investments";
      return NextResponse.redirect(new URL(destination, request.url));
    }
    return NextResponse.next();
  }

  if (!authenticated) {
    const loginUrl = new URL("/login", request.url);
    const callbackUrl = `${pathname}${request.nextUrl.search}`;
    if (callbackUrl !== "/") {
      loginUrl.searchParams.set("callbackUrl", callbackUrl);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
