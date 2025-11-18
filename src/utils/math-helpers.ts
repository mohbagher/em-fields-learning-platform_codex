/**
 * Math helpers for simulation calculations.
 * TODO: Add vector operations, interpolation, and randomization utilities.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
