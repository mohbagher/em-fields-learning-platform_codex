import { useMemo, useState } from 'react';

/**
 * Tracks progress through modules and sections.
 * TODO: Persist progress and compute completion across content types.
 */
export function useProgress(initial = 0) {
  const [progress, setProgress] = useState(initial);
  const clampedProgress = useMemo(() => Math.min(100, Math.max(0, progress)), [progress]);

  return { progress: clampedProgress, setProgress };
}
