/**
 * Helpers for tracking performance metrics.
 * TODO: Add moving averages and telemetry batching.
 */
export function averageFps(samples: number[]): number {
  if (samples.length === 0) return 0;
  const sum = samples.reduce((acc, value) => acc + value, 0);
  return sum / samples.length;
}
