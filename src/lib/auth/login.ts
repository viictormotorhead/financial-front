import { getServerApiBaseUrl } from "@/lib/api/config";
import type { ApiEnvelope } from "@/lib/api/types";

import { DEFAULT_SESSION_MAX_AGE_SEC } from "./constants";

export type LoginCredentials = Readonly<{
  username: string;
  password: string;
}>;

export type LoginSuccess = Readonly<{
  accessToken: string;
  expiresInSec: number;
}>;

export class AuthLoginError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AuthLoginError";
    this.status = status;
  }
}

function tokenFromRecord(record: Record<string, unknown>): string | null {
  if (typeof record.access_token === "string") return record.access_token;
  if (typeof record.token === "string") return record.token;
  return null;
}

function extractAccessToken(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;

  const record = body as Record<string, unknown>;
  const fromRoot = tokenFromRecord(record);
  if (fromRoot) return fromRoot;

  const data = record.data;
  if (!data || typeof data !== "object") return null;

  const dataRecord = data as Record<string, unknown>;
  const fromData = tokenFromRecord(dataRecord);
  if (fromData) return fromData;

  const auth = dataRecord.auth;
  if (auth && typeof auth === "object") {
    return tokenFromRecord(auth as Record<string, unknown>);
  }

  return null;
}

function extractExpiresInSec(payload: unknown): number | undefined {
  if (!payload || typeof payload !== "object") return undefined;

  const record = payload as Record<string, unknown>;
  const direct = record.expires_in;
  if (typeof direct === "number" && direct > 0) return direct;

  const data = record.data;
  if (data && typeof data === "object") {
    const inner = data as Record<string, unknown>;
    const nested = inner.expires_in;
    if (typeof nested === "number" && nested > 0) return nested;
  }

  return undefined;
}

/**
 * Autentica contra el backend (`POST /v1/auth/login`).
 * Acepta respuesta plana o envuelta en `{ status, data }` / `{ status, data: { auth } }`.
 */
export async function loginOnBackend(
  credentials: LoginCredentials,
): Promise<LoginSuccess> {
  const url = `${getServerApiBaseUrl()}/v1/auth/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    }),
  });

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new AuthLoginError(
      "Respuesta inválida del servidor de autenticación",
      response.status || 502,
    );
  }

  if (!response.ok) {
    const envelope = body as Partial<ApiEnvelope<unknown>>;
    throw new AuthLoginError(
      envelope.message || "Usuario o contraseña incorrectos",
      response.status,
    );
  }

  const accessToken = extractAccessToken(body);

  if (!accessToken) {
    throw new AuthLoginError(
      "El servidor no devolvió un token de acceso",
      502,
    );
  }

  const expiresInSec = extractExpiresInSec(body);

  return {
    accessToken,
    expiresInSec: expiresInSec ?? DEFAULT_SESSION_MAX_AGE_SEC,
  };
}
