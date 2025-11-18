import type { FC } from 'react';

/**
 * Simple horizontal progress indicator for module completion.
 * TODO: Wire up to module/section progress data and animate transitions.
 */
const ProgressBar: FC = () => (
  <div className="w-full">
    <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
      <span>Progress</span>
      <span>0%</span>
    </div>
    <div className="h-2 rounded-full bg-slate-800">
      <div className="h-2 w-[10%] rounded-full bg-emerald-400/80" aria-hidden />
    </div>
  </div>
);

export default ProgressBar;
