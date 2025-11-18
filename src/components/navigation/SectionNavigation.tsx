import type { FC } from 'react';

/**
 * Sidebar listing sections within the active module.
 * TODO: Render section hierarchy and mark completion state.
 */
const SectionNavigation: FC = () => (
  <nav className="flex flex-col gap-3" aria-label="Section navigation">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-white">Sections</h2>
      <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-200">TODO</span>
    </div>
    <p className="text-sm text-slate-400">Section navigation coming soon.</p>
  </nav>
);

export default SectionNavigation;
