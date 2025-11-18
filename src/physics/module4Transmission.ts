import { LIGHT_SPEED } from "../utils/constants";

/**
 * Characteristic impedance of a (nearly) lossless line.
 * Z0 ≈ sqrt(L/C)
 */
export function characteristicImpedance(
  inductancePerMeter: number,
  capacitancePerMeter: number
): number {
  if (capacitancePerMeter <= 0) return 0;
  return Math.sqrt(inductancePerMeter / capacitancePerMeter);
}

/**
 * Reflection coefficient Γ = (ZL - Z0) / (ZL + Z0)
 */
export function reflectionCoefficient(loadImpedance: number, lineImpedance: number): number {
  if (lineImpedance === 0) return 0;
  return (loadImpedance - lineImpedance) / (loadImpedance + lineImpedance);
}

/**
 * Voltage standing wave ratio derived from |Γ|.
 */
export function voltageStandingWaveRatio(gamma: number): number {
  const magnitude = Math.abs(gamma);
  if (magnitude >= 1) return Infinity;
  return (1 + magnitude) / (1 - magnitude);
}

/**
 * Total loss in dB along a line given attenuation per meter.
 */
export function transmissionLossDb(
  lengthMeters: number,
  attenuationDbPerMeter: number
): number {
  return lengthMeters * attenuationDbPerMeter;
}

/**
 * Propagation delay through a line: t = length / (vf * c)
 */
export function propagationDelay(
  lengthMeters: number,
  velocityFactor: number = 0.66,
  waveSpeed: number = LIGHT_SPEED
): number {
  if (velocityFactor <= 0) return 0;
  return lengthMeters / (velocityFactor * waveSpeed);
}
