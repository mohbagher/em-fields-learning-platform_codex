import { useEffect, useState } from 'react';

/**
 * Simplified localStorage-backed state hook.
 * TODO: Harden against quota errors and JSON parse failures.
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored) as T);
      }
    } catch (error) {
      console.warn('useLocalStorage read failed', error);
    }
  }, [key]);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('useLocalStorage write failed', error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
