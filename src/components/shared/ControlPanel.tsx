import React from "react";
import Slider from "./Slider";
import ToggleSwitch from "./ToggleSwitch";
import { ParameterConfig } from "../../types";

/**
 * ControlPanel Component
 *
 * Reusable control panel for interactive parameters.
 * Automatically generates controls based on parameter configuration.
 */

interface ControlPanelProps {
  parameters: ParameterConfig[];
  values: Record<string, any>;
  onChange: (id: string, value: any) => void;
  className?: string;
}

export default function ControlPanel({
  parameters,
  values,
  onChange,
  className = ""
}: ControlPanelProps): JSX.Element {
  /**
   * Render appropriate control based on parameter type
   */
  const renderControl = (param: ParameterConfig) => {
    switch (param.type) {
      case "slider":
        return (
          <Slider
            key={param.id}
            label={param.label}
            value={
              typeof values[param.id] === "number"
                ? values[param.id]
                : (param.default as number)
            }
            min={param.min ?? 0}
            max={param.max ?? 1}
            step={param.step ?? 0.01}
            unit={param.unit}
            onChange={(value) => onChange(param.id, value)}
            description={param.description}
          />
        );

      case "toggle":
        return (
          <ToggleSwitch
            key={param.id}
            label={param.label}
            checked={
              typeof values[param.id] === "boolean"
                ? values[param.id]
                : (param.default as boolean)
            }
            onChange={(checked) => onChange(param.id, checked)}
            description={param.description}
          />
        );

      case "dropdown":
        // === EXPAND-BLOCK: DROPDOWN-CONTROL ===
        // Implement dropdown select control.
        // We expect param.options to be an array of { label, value }.
        {
          const options =
            (param as any).options ??
            ([] as { label: string; value: string | number }[]);

          const currentValue =
            values[param.id] !== undefined
              ? values[param.id]
              : (param.default as string | number);

          return (
            <div
              key={param.id}
              className="flex flex-col gap-1 text-sm text-gray-800 dark:text-gray-100"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{param.label}</span>
                {param.description && (
                  <span
                    className="ml-1 text-xs text-gray-400 cursor-help"
                    title={param.description}
                  >
                    ⓘ
                  </span>
                )}
              </div>
              <select
                className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={currentValue}
                onChange={(e) => {
                  const raw = e.target.value;
                  // Try to keep numeric values numeric
                  const numberValue = Number(raw);
                  const valueToSet =
                    !Number.isNaN(numberValue) && raw.trim() !== ""
                      ? numberValue
                      : raw;
                  onChange(param.id, valueToSet);
                }}
                aria-label={param.label}
              >
                {options.map((opt: any) => (
                  <option key={String(opt.value)} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }
        // === END-EXPAND-BLOCK ===

      case "input":
        // === EXPAND-BLOCK: INPUT-CONTROL ===
        // Numeric input control with optional min / max / step.
        {
          const currentValue =
            values[param.id] !== undefined
              ? values[param.id]
              : (param.default as number | string);

          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value;
            if (raw === "") {
              onChange(param.id, "");
              return;
            }
            const numeric = Number(raw);
            if (Number.isNaN(numeric)) {
              return;
            }

            let clamped = numeric;
            if (typeof param.min === "number") {
              clamped = Math.max(param.min, clamped);
            }
            if (typeof param.max === "number") {
              clamped = Math.min(param.max, clamped);
            }

            onChange(param.id, clamped);
          };

          return (
            <div
              key={param.id}
              className="flex flex-col gap-1 text-sm text-gray-800 dark:text-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{param.label}</span>
                  {param.description && (
                    <span
                      className="ml-1 text-xs text-gray-400 cursor-help"
                      title={param.description}
                    >
                      ⓘ
                    </span>
                  )}
                </div>
                {param.unit && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {param.unit}
                  </span>
                )}
              </div>
              <input
                type="number"
                className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={currentValue}
                min={param.min}
                max={param.max}
                step={param.step}
                onChange={handleChange}
                aria-label={param.label}
              />
            </div>
          );
        }
        // === END-EXPAND-BLOCK ===

      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md ${className}`}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-50">
        Controls
      </h3>
      <div className="space-y-4">{parameters.map(renderControl)}</div>

      {/* Reset button */}
      <button
        onClick={() => {
          parameters.forEach((param) => {
            onChange(param.id, param.default);
          });
        }}
        className="mt-4 w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm font-medium"
      >
        Reset to Defaults
      </button>
    </div>
  );
}
