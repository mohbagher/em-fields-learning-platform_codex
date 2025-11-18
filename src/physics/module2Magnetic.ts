import { MU_0 } from "../utils/constants";
import { Vector3D } from "../types";

/**
 * Magnetic field strength around a long, straight conductor.
 * Uses the simplified Biot–Savart result B = μ0 * I / (2πr).
 */
export function magneticFieldStraightWire(
  current: number,
  distanceMeters: number
): number {
  if (distanceMeters <= 0) return 0;
  return (MU_0 * current) / (2 * Math.PI * distanceMeters);
}

/**
 * Magnetic field at the center of a circular loop.
 * B = μ0 * I / (2R)
 */
export function magneticFieldLoop(current: number, radiusMeters: number): number {
  if (radiusMeters <= 0) return 0;
  return (MU_0 * current) / (2 * radiusMeters);
}

/**
 * Axial field approximation for a long solenoid.
 * B = μ0 * n * I, where n is turns per meter.
 */
export function solenoidField(turnsPerMeter: number, current: number): number {
  if (turnsPerMeter <= 0 || current <= 0) return 0;
  return MU_0 * turnsPerMeter * current;
}

/**
 * Inductance of a solenoid using L = μ0 * N^2 * A / l.
 */
export function solenoidInductance(
  totalTurns: number,
  crossSectionArea: number,
  lengthMeters: number
): number {
  if (lengthMeters <= 0) return 0;
  return (MU_0 * totalTurns * totalTurns * crossSectionArea) / lengthMeters;
}

/**
 * Magnetic flux through an area with an optional incident angle.
 */
export function magneticFlux(
  magneticFieldTeslas: number,
  areaSquareMeters: number,
  incidenceAngleRad: number = 0
): number {
  return magneticFieldTeslas * areaSquareMeters * Math.cos(incidenceAngleRad);
}

/**
 * Lorentz force from a magnetic field: F = q (v × B).
 */
export function lorentzForce(
  chargeCoulombs: number,
  velocity: Vector3D,
  magneticField: Vector3D
): Vector3D {
  return {
    x: chargeCoulombs * (velocity.y * magneticField.z - velocity.z * magneticField.y),
    y: chargeCoulombs * (velocity.z * magneticField.x - velocity.x * magneticField.z),
    z: chargeCoulombs * (velocity.x * magneticField.y - velocity.y * magneticField.x)
  };
}
