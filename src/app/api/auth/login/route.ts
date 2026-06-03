import { NextResponse } from "next/server";

import { applySessionCookie } from "@/lib/auth/cookies";
import { AuthLoginError, loginOnBackend } from "@/lib/auth/login";

type LoginBody = Readonly<{
  username?: string;
  password?: string;
}>;

export async function POST(request: Request): Promise<NextResponse> {
  let body: LoginBody;

  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json(
      { status: "error", message: "Cuerpo de solicitud inválido", data: null },
      { status: 400 },
    );
  }

  const username = body.username?.trim() ?? "";
  const password = body.password ?? "";

  if (!username || !password) {
    return NextResponse.json(
      {
        status: "error",
        message: "Usuario y contraseña son obligatorios",
        data: null,
      },
      { status: 400 },
    );
  }

  try {
    const session = await loginOnBackend({ username, password });
    const response = NextResponse.json({
      status: "ok",
      message: "Sesión iniciada",
      data: null,
    });
    return applySessionCookie(response, session.accessToken, session.expiresInSec);
  } catch (err) {
    if (err instanceof AuthLoginError) {
      return NextResponse.json(
        { status: "error", message: err.message, data: null },
        { status: err.status },
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: "No se pudo iniciar sesión. Intenta de nuevo.",
        data: null,
      },
      { status: 500 },
    );
  }
}
