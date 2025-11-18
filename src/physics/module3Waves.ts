import { EPSILON_0, LIGHT_SPEED } from "../utils/constants";

/**
 * Compute wavelength from frequency using λ = c / f.
 */
export function wavelength(frequencyHz: number, speed: number = LIGHT_SPEED): number {
  if (frequencyHz <= 0) return 0;
  return speed / frequencyHz;
}

/**
 * Wave number k = 2π / λ.
 */
export function waveNumber(frequencyHz: number, speed: number = LIGHT_SPEED): number {
  const lambda = wavelength(frequencyHz, speed);
  if (lambda === 0) return 0;
  return (2 * Math.PI) / lambda;
}

/**
 * Instantaneous wave value for a traveling sine wave A sin(2πft - kx + φ).
 */
export function waveValueAt(
  xMeters: number,
  timeSeconds: number,
  amplitude: number,
  frequencyHz: number,
  phaseRad: number = 0,
  speed: number = LIGHT_SPEED
): number {
  const k = waveNumber(frequencyHz, speed);
  const omega = 2 * Math.PI * frequencyHz;
  return amplitude * Math.sin(omega * timeSeconds - k * xMeters + phaseRad);
}

/**
 * Standing wave: A sin(kx) cos(ωt)
 */
export function standingWaveValue(
  xMeters: number,
  timeSeconds: number,
  amplitude: number,
  frequencyHz: number,
  speed: number = LIGHT_SPEED
): number {
  const k = waveNumber(frequencyHz, speed);
  const omega = 2 * Math.PI * frequencyHz;
  return amplitude * Math.sin(k * xMeters) * Math.cos(omega * timeSeconds);
}

/**
 * EM wave intensity approximation: I = 0.5 * ε0 * c * E^2
 */
export function emWaveIntensity(electricFieldStrength: number): number {
  return 0.5 * EPSILON_0 * LIGHT_SPEED * electricFieldStrength * electricFieldStrength;
}
