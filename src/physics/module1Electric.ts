import { EPSILON_0, K_E } from "../utils/constants";
import { ElectricFieldResult, PointCharge, Vector3D } from "../types";

const MIN_DISTANCE = 1e-3;

/**
 * Compute vector difference b - a.
 */
function subtract(a: Vector3D, b: Vector3D): Vector3D {
  return { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
}

function magnitude(v: Vector3D): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

function normalize(v: Vector3D): Vector3D {
  const mag = magnitude(v);
  if (mag < MIN_DISTANCE) return { x: 0, y: 0, z: 0 };
  return { x: v.x / mag, y: v.y / mag, z: v.z / mag };
}

function scale(v: Vector3D, scalar: number): Vector3D {
  return { x: v.x * scalar, y: v.y * scalar, z: v.z * scalar };
}

function add(a: Vector3D, b: Vector3D): Vector3D {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

/**
 * Coulomb force vector acting on target due to source.
 */
export function coulombForceVector(
  source: PointCharge,
  target: PointCharge
): Vector3D {
  const rVec = subtract(source.position, target.position);
  const r = magnitude(rVec) || MIN_DISTANCE;
  const direction = normalize(rVec);
  const magnitudeForce = (K_E * source.q * target.q) / (r * r);
  return scale(direction, magnitudeForce);
}

/**
 * Electric field at a point produced by all charges.
 */
export function electricFieldAtPoint(
  charges: PointCharge[],
  point: Vector3D
): ElectricFieldResult {
  let field: Vector3D = { x: 0, y: 0, z: 0 };
  let potential = 0;

  charges.forEach((charge) => {
    const rVec = subtract(point, charge.position);
    const r = Math.max(magnitude(rVec), MIN_DISTANCE);
    const direction = normalize(rVec);
    const contribution = K_E * charge.q / (r * r);
    field = add(field, scale(direction, contribution));

    potential += K_E * charge.q / r;
  });

  return { field, potential };
}

/**
 * Follow electric field lines using simple Euler integration.
 */
export function generateFieldLine(
  charges: PointCharge[],
  start: Vector3D,
  step: number = 0.05,
  maxSteps: number = 400
): Vector3D[] {
  const points: Vector3D[] = [start];
  let current = start;

  for (let i = 0; i < maxSteps; i++) {
    const { field } = electricFieldAtPoint(charges, current);
    const direction = normalize(field);

    if (magnitude(direction) < MIN_DISTANCE) {
      break;
    }

    const next = add(current, scale(direction, step));
    points.push(next);
    current = next;

    // Stop if we get too close to a charge to avoid singularities
    const nearCharge = charges.some(
      (c) => magnitude(subtract(next, c.position)) < MIN_DISTANCE * 10
    );
    if (nearCharge) break;
  }

  return points;
}

/* ... existing coulombForce, coulombForceVector, electricFieldFromCharge,
   electricFieldAtPoint, generateFieldLine, parallelPlateCapacitance,
   capacitorEnergy, energyDensity etc stay unchanged ... */

/**
 * Generate equipotential contour at a given voltage
 *
 * Uses a simple marching squares style approach on a 2D grid.
 */
export function generateEquipotentialLine(
  charges: PointCharge[],
  voltage: number,
  bounds: { xMin: number; xMax: number; yMin: number; yMax: number },
  resolution: number = 50
): Vector3D[] {
  const { xMin, xMax, yMin, yMax } = bounds;

  const cols = resolution;
  const rows = resolution;

  const dx = (xMax - xMin) / cols;
  const dy = (yMax - yMin) / rows;

  // Precompute potentials on grid
  const potentials: number[][] = [];
  for (let j = 0; j <= rows; j++) {
    const y = yMin + j * dy;
    const row: number[] = [];
    for (let i = 0; i <= cols; i++) {
      const x = xMin + i * dx;
      const result = electricFieldAtPoint(charges, { x, y, z: 0 });
      row.push(result.potential);
    }
    potentials.push(row);
  }

  const points: Vector3D[] = [];

  // Helper to sample potential
  const sample = (i: number, j: number) => potentials[j][i];

  // Linear interpolation on an edge between (x1,y1,v1) and (x2,y2,v2)
  const interp = (
    x1: number,
    y1: number,
    v1: number,
    x2: number,
    y2: number,
    v2: number
  ): { x: number; y: number } => {
    const t =
      v2 === v1 ? 0.5 : (voltage - v1) / (v2 - v1); // avoid div by zero
    return {
      x: x1 + t * (x2 - x1),
      y: y1 + t * (y2 - y1)
    };
  };

  // Loop over grid cells
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x1 = xMin + i * dx;
      const y1 = yMin + j * dy;
      const x2 = xMin + (i + 1) * dx;
      const y2 = yMin + (j + 1) * dy;

      const v00 = sample(i, j) - voltage;
      const v10 = sample(i + 1, j) - voltage;
      const v01 = sample(i, j + 1) - voltage;
      const v11 = sample(i + 1, j + 1) - voltage;

      // Check each edge for sign change
      const intersections: { x: number; y: number }[] = [];

      // Bottom edge: (x1,y1) to (x2,y1)
      if (v00 * v10 < 0) {
        intersections.push(interp(x1, y1, v00, x2, y1, v10));
      }

      // Top edge: (x1,y2) to (x2,y2)
      if (v01 * v11 < 0) {
        intersections.push(interp(x1, y2, v01, x2, y2, v11));
      }

      // Left edge: (x1,y1) to (x1,y2)
      if (v00 * v01 < 0) {
        intersections.push(interp(x1, y1, v00, x1, y2, v01));
      }

      // Right edge: (x2,y1) to (x2,y2)
      if (v10 * v11 < 0) {
        intersections.push(interp(x2, y1, v10, x2, y2, v11));
      }

      // Add intersection points to result
      for (const p of intersections) {
        points.push({ x: p.x, y: p.y, z: 0 });
      }
    }
  }

  return points;
}
