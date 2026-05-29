import { getApiBaseUrl } from "./config";
import type { ApiEnvelope } from "./types";
import { ApiError } from "./types";

type RequestOptions = Readonly<{
  signal?: AbortSignal;
}>;

export async function apiGet<T>(
  path: string,
  options?: RequestOptions,
): Promise<T> {
  const url = `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    signal: options?.signal,
  });

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
  const url = `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: options?.signal,
  });

  const payload = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok || payload.status !== "ok") {
    throw new ApiError(
      payload.message || `Request failed (${response.status})`,
      response.status,
    );
  }

  return payload.data;
}
