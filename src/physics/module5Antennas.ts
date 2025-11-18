import { LIGHT_SPEED } from "../utils/constants";

/**
 * Half-wave dipole nominal gain (in dBi).
 */
export function halfWaveDipoleGainDb(): number {
  return 2.15;
}

/**
 * Effective aperture from gain and frequency: Ae = (G λ^2) / (4π).
 */
export function effectiveAperture(gainDb: number, frequencyHz: number): number {
  if (frequencyHz <= 0) return 0;
  const lambda = LIGHT_SPEED / frequencyHz;
  const gainLinear = Math.pow(10, gainDb / 10);
  return (gainLinear * lambda * lambda) / (4 * Math.PI);
}

/**
 * Friis transmission equation in dBm.
 */
export function receivedPowerFriisDbm(
  txPowerDbm: number,
  txGainDb: number,
  rxGainDb: number,
  frequencyHz: number,
  distanceMeters: number
): number {
  const distanceKm = distanceMeters / 1000;
  const frequencyMhz = frequencyHz / 1e6;
  const fspl = 20 * Math.log10(distanceKm) + 20 * Math.log10(frequencyMhz) + 32.44;
  return txPowerDbm + txGainDb + rxGainDb - fspl;
}

/**
 * Approximate 3 dB beamwidth (degrees) for an aperture of diameter D.
 */
export function beamwidthDegrees(frequencyHz: number, apertureDiameterMeters: number): number {
  if (apertureDiameterMeters <= 0 || frequencyHz <= 0) return 0;
  const lambda = LIGHT_SPEED / frequencyHz;
  return 70 * (lambda / apertureDiameterMeters);
}

/**
 * Polarization mismatch loss (dB) for an angle between electric field vectors.
 */
export function polarizationMismatchLossDb(angleRad: number): number {
  const lossLinear = Math.pow(Math.cos(angleRad), 2);
  if (lossLinear <= 0) return Infinity;
  return -10 * Math.log10(lossLinear);
}
