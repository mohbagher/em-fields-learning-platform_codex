import type { FC } from 'react';

/**
 * Numeric input for parameter tuning.
 * TODO: Add validation, units display, and change callbacks.
 */
const NumericInput: FC = () => (
  <div className="flex flex-col gap-1 text-sm">
    <label className="text-slate-300">Numeric input</label>
    <input
      type="number"
      className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
      placeholder="0"
      aria-label="Numeric input placeholder"
    />
  </div>
);

export default NumericInput;
