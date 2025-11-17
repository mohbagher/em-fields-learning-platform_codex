import type { FC } from 'react';

/**
 * Footer controls for stepping through modules and sections.
 * TODO: Connect buttons to navigation logic and progress state.
 */
const NavigationFooter: FC = () => (
  <footer className="border-t border-slate-800 bg-slate-900/70 px-6 py-4">
    <div className="mx-auto flex max-w-6xl items-center justify-between">
      <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200">
        Previous
      </button>
      <p className="text-xs text-slate-400">TODO: Navigation metadata and hints.</p>
      <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900">
        Next
      </button>
    </div>
  </footer>
);

export default NavigationFooter;
