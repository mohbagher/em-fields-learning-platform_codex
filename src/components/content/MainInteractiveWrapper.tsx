import type { FC, ReactNode } from 'react';

/**
 * Container for the primary simulation or visualization of a section.
 * TODO: Swap the child interactive based on routing and user selections.
 */
const MainInteractiveWrapper: FC<{ children?: ReactNode }> = ({ children }) => (
  <section className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
    <div className="flex items-center justify-between">
      <h4 className="text-lg font-semibold text-white">Main interactive</h4>
      <span className="text-xs text-emerald-200">TODO</span>
    </div>
    <div className="mt-3 text-sm text-slate-200">{children ?? 'Interactive placeholder area.'}</div>
  </section>
);

export default MainInteractiveWrapper;
