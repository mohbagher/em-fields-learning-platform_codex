/**
 * Storage helpers for persisting user preferences.
 * TODO: Add namespacing and error handling for broader data types.
 */
export function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.warn('Failed to parse stored value', error);
    return fallback;
  }
}
