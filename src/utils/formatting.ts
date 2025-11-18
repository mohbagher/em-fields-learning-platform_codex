/**
 * Formatting helpers for units and labels.
 * TODO: Localize formatting and add significant-figure handling.
 */
export function formatNumber(value: number, suffix = ''): string {
  return `${value.toFixed(2)}${suffix}`;
}
