export const BASE_URL: string =
  (import.meta as { env?: { VITE_BASE_URL?: string } }).env?.VITE_BASE_URL ??
  '/'
