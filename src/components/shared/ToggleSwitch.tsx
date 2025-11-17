// src/components/shared/ToggleSwitch.tsx
import React from "react";

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

export default function ToggleSwitch({
  label,
  checked,
  onChange,
  description
}: ToggleSwitchProps): JSX.Element {
  return (
    <div className="flex items-center justify-between text-sm text-gray-800 dark:text-gray-100">
      <div className="flex items-center gap-1">
        <span className="font-medium">{label}</span>
        {description && (
          <span
            className="ml-1 text-xs text-gray-400 cursor-help"
            title={description}
          >
            ⓘ
          </span>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
          checked ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
            checked ? "translate-x-4" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
