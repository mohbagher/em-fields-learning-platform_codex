import type { FC, ReactNode } from 'react';

/**
 * Frame around charts or plotting components.
 * TODO: Connect to graphing library and responsive sizing.
 */
const GraphWrapper: FC<{ title?: string; children?: ReactNode }> = ({ title = 'Graph', children }) => (
  <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
    <div className="flex items-center justify-between">
      <h5 className="text-sm font-semibold text-white">{title}</h5>
      <span className="text-xs text-slate-400">TODO</span>
    </div>
    <div className="mt-3 min-h-[160px] rounded-md border border-dashed border-emerald-400/30 bg-emerald-400/5" role="img">
      {children ?? <p className="p-3 text-xs text-emerald-100">Graph placeholder</p>}
    </div>
  </div>
);

export default GraphWrapper;
