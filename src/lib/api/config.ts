/**
 * URL del API backend (incluye `/api`). Solo servidor — no exponer el token al cliente.
 *
 * `.env`:
 * `API_URL=http://localhost:3010/api`
 *
 * `NEXT_PUBLIC_API_URL` se acepta como respaldo por compatibilidad.
 */
export function getServerApiBaseUrl(): string {
  const fromEnv =
    process.env.API_URL?.trim() || process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!fromEnv) {
    throw new Error(
      "API_URL no está definida. Copia .env.example a .env y reinicia el servidor.",
    );
  }

  return fromEnv.replace(/\/$/, "");
}

/** Base para peticiones desde el navegador (proxy BFF en Next.js). */
export function getClientApiBaseUrl(): string {
  return "/api/backend";
}
