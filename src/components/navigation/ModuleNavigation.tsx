import type { FC } from 'react';

/**
 * Sidebar listing top-level learning modules.
 * TODO: Populate from data source and highlight active module.
 */
const ModuleNavigation: FC = () => (
  <nav className="flex flex-col gap-3" aria-label="Module navigation">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-white">Modules</h2>
      <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-200">TODO</span>
    </div>
    <p className="text-sm text-slate-400">Module navigation coming soon.</p>
  </nav>
);

export default ModuleNavigation;
