import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

import {
  AUTH_COOKIE_NAME,
  DEFAULT_SESSION_MAX_AGE_SEC,
} from "./constants";

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

export function getSessionCookieOptions(maxAgeSec: number): {
  httpOnly: true;
  secure: boolean;
  sameSite: "lax";
  path: "/";
  maxAge: number;
} {
  return {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSec,
  };
}

export async function getSessionToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(AUTH_COOKIE_NAME)?.value;
}

export function applySessionCookie(
  response: NextResponse,
  token: string,
  maxAgeSec: number = DEFAULT_SESSION_MAX_AGE_SEC,
): NextResponse {
  response.cookies.set(AUTH_COOKIE_NAME, token, getSessionCookieOptions(maxAgeSec));
  return response;
}

export function clearSessionCookie(response: NextResponse): NextResponse {
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    ...getSessionCookieOptions(0),
    maxAge: 0,
  });
  return response;
}
