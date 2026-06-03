export const AUTH_COOKIE_NAME = "mf_access_token";

/** Duración por defecto de la sesión si el backend no envía `expires_in`. */
export const DEFAULT_SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7;

export const PUBLIC_PATHS = ["/login"] as const;

export const AUTH_API_PREFIX = "/api/auth";

export const BACKEND_PROXY_PREFIX = "/api/backend";
