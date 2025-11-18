import React from "react";

/**
 * Slider Component
 *
 * Custom slider with label, value display, and optional unit.
 * Includes tooltip on hover showing description.
 */

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
  description?: string;
}

export default function Slider({
  label,
  value,
  min,
  max,
  step,
  unit = "",
  onChange,
  description
}: SliderProps): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!Number.isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {label}
          </span>
          {description && (
            <span
              className="ml-1 text-xs text-gray-400 cursor-help"
              title={description}
              aria-label={description}
            >
              ⓘ
            </span>
          )}
        </div>
        <span className="text-xs font-mono text-gray-600 dark:text-gray-300">
          {value.toPrecision(3)} {unit}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full accent-blue-500"
        aria-label={label}
      />
    </div>
  );
}
