export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface PointCharge {
  q: number;
  position: Vector3D;
}

export interface ElectricFieldResult {
  field: Vector3D;
  potential: number;
}

export type ParameterType = "slider" | "toggle" | "dropdown" | "input";

export interface ParameterOption {
  label: string;
  value: string | number;
}

export interface ParameterConfig {
  id: string;
  label: string;
  type: ParameterType;
  default: number | string | boolean;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  description?: string;
  options?: ParameterOption[];
}
