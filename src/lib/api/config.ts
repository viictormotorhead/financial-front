/**
 * Base del API (incluye `/api`). Definir en `.env`:
 * `NEXT_PUBLIC_API_URL=http://localhost:3010/api`
 *
 * Tras cambiar `.env`, reinicia `npm run dev`.
 */
export function getApiBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!fromEnv) {
    throw new Error(
      "NEXT_PUBLIC_API_URL no está definida. Copia .env.example a .env y reinicia el servidor.",
    );
  }
  return fromEnv.replace(/\/$/, "");
}
