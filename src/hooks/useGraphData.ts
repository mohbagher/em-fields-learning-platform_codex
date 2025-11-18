import { useMemo, useState } from 'react';

/**
 * Placeholder hook for preparing graph-friendly datasets.
 * TODO: Replace mock data with real simulation outputs and formatting.
 */
export function useGraphData<T = number>(initial: T[] = []) {
  const [points, setPoints] = useState<T[]>(initial);
  const summary = useMemo(() => ({ count: points.length }), [points.length]);

  return { points, setPoints, summary };
}
