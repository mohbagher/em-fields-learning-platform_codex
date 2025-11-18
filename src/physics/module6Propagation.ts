import { LIGHT_SPEED } from "../utils/constants";

/**
 * Free-space path loss in dB using distance (m) and frequency (Hz).
 */
export function freeSpacePathLossDb(distanceMeters: number, frequencyHz: number): number {
  if (distanceMeters <= 0 || frequencyHz <= 0) return 0;
  const distanceKm = distanceMeters / 1000;
  const frequencyMhz = frequencyHz / 1e6;
  return 20 * Math.log10(distanceKm) + 20 * Math.log10(frequencyMhz) + 32.44;
}

/**
 * First Fresnel zone radius at a point between transmitter and receiver.
 */
export function fresnelRadius(
  d1Meters: number,
  d2Meters: number,
  frequencyHz: number
): number {
  if (frequencyHz <= 0) return 0;
  const lambda = LIGHT_SPEED / frequencyHz;
  return Math.sqrt((lambda * d1Meters * d2Meters) / (d1Meters + d2Meters));
}

/**
 * Simple rain attenuation model (specific attenuation γ_R) scaled by path length.
 */
export function rainAttenuationDb(
  rainRateMmPerHr: number,
  frequencyGhz: number,
  pathLengthKm: number
): number {
  if (rainRateMmPerHr <= 0) return 0;
  const k = 0.0001 * Math.pow(frequencyGhz, 1.2);
  const alpha = 1.0;
  const specific = k * Math.pow(rainRateMmPerHr, alpha); // dB/km
  return specific * pathLengthKm;
}

/**
 * Root-mean-square delay spread from multipath delays (seconds) and powers (linear).
 */
export function rmsDelaySpread(delaysSeconds: number[], powersLinear: number[]): number {
  if (delaysSeconds.length === 0 || delaysSeconds.length !== powersLinear.length) {
    return 0;
  }
  const totalPower = powersLinear.reduce((sum, p) => sum + p, 0);
  if (totalPower === 0) return 0;
  const meanDelay = delaysSeconds.reduce((sum, d, idx) => sum + d * powersLinear[idx], 0) / totalPower;
  const meanSquared =
    delaysSeconds.reduce((sum, d, idx) => sum + d * d * powersLinear[idx], 0) / totalPower;
  return Math.sqrt(meanSquared - meanDelay * meanDelay);
}

/**
 * Atmospheric absorption placeholder (very coarse) in dB.
 */
export function atmosphericLossDb(distanceMeters: number, frequencyGhz: number): number {
  const specificLoss = 0.01 * Math.pow(frequencyGhz, 0.5); // dB/km
  return (distanceMeters / 1000) * specificLoss;
}
