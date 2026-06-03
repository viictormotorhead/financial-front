import { NextResponse } from "next/server";

import { clearSessionCookie, getSessionToken } from "@/lib/auth/cookies";

import { getServerApiBaseUrl } from "./config";

export async function proxyToBackend(
  request: Request,
  pathSegments: readonly string[],
): Promise<NextResponse> {
  const token = await getSessionToken();

  if (!token) {
    return NextResponse.json(
      { status: "error", message: "No autorizado", data: null },
      { status: 401 },
    );
  }

  const { search } = new URL(request.url);
  const path = pathSegments.join("/");
  const url = `${getServerApiBaseUrl()}/${path}${search}`;
  const method = request.method.toUpperCase();

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Accept", "application/json");

  let body: string | undefined;
  if (method !== "GET" && method !== "HEAD") {
    const contentType = request.headers.get("content-type");
    if (contentType) headers.set("Content-Type", contentType);
    body = await request.text();
  }

  const backendResponse = await fetch(url, { method, headers, body });
  const responseText = await backendResponse.text();

  const response = new NextResponse(responseText, {
    status: backendResponse.status,
    headers: {
      "Content-Type":
        backendResponse.headers.get("Content-Type") ?? "application/json",
    },
  });

  if (backendResponse.status === 401) {
    clearSessionCookie(response);
  }

  return response;
}
