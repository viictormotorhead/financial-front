import { getClientApiBaseUrl } from "./config";
import type { ApiEnvelope } from "./types";
import { ApiError } from "./types";

type RequestOptions = Readonly<{
  signal?: AbortSignal;
}>;

function redirectToLoginIfUnauthorized(status: number): void {
  if (status !== 401 || typeof window === "undefined") return;

  const callbackUrl = `${window.location.pathname}${window.location.search}`;
  const loginUrl = new URL("/login", window.location.origin);
  if (callbackUrl && callbackUrl !== "/") {
    loginUrl.searchParams.set("callbackUrl", callbackUrl);
  }
  window.location.assign(loginUrl.toString());
}

function buildClientUrl(path: string): string {
  const base = getClientApiBaseUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export async function apiGet<T>(
  path: string,
  options?: RequestOptions,
): Promise<T> {
  const response = await fetch(buildClientUrl(path), {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "same-origin",
    signal: options?.signal,
  });

  if (response.status === 401) {
    redirectToLoginIfUnauthorized(401);
    throw new ApiError("No autorizado", 401);
  }

  const body = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok || body.status !== "ok") {
    throw new ApiError(
      body.message || `Request failed (${response.status})`,
      response.status,
    );
  }

  return body.data;
}

export async function apiPost<T>(
  path: string,
  body: unknown,
  options?: RequestOptions,
): Promise<T> {
  const response = await fetch(buildClientUrl(path), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(body),
    signal: options?.signal,
  });

  if (response.status === 401) {
    redirectToLoginIfUnauthorized(401);
    throw new ApiError("No autorizado", 401);
  }

  const payload = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok || payload.status !== "ok") {
    throw new ApiError(
      payload.message || `Request failed (${response.status})`,
      response.status,
    );
  }

  return payload.data;
}
