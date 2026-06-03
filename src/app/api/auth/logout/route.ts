import { NextResponse } from "next/server";

import { clearSessionCookie } from "@/lib/auth/cookies";

export async function POST(): Promise<NextResponse> {
  const response = NextResponse.json({
    status: "ok",
    message: "Sesión cerrada",
    data: null,
  });
  return clearSessionCookie(response);
}
