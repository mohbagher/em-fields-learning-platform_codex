import type { FC } from 'react';

/**
 * Basic dropdown selector for choosing presets or modes.
 * TODO: Accept options as props and surface onChange handlers.
 */
const Dropdown: FC = () => (
  <div className="flex flex-col gap-1 text-sm">
    <label className="text-slate-300">Dropdown</label>
    <select className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100">
      <option>Placeholder option</option>
    </select>
  </div>
);

export default Dropdown;
