import type { FC } from 'react';

/**
 * Transport controls for pausing, playing, and scrubbing simulation timelines.
 * TODO: Wire to animation loop and sync with graph data.
 */
const AnimationControls: FC = () => (
  <div className="flex items-center gap-2 text-sm text-slate-200">
    <button className="rounded-md border border-slate-700 px-3 py-1">Play</button>
    <button className="rounded-md border border-slate-700 px-3 py-1">Pause</button>
    <button className="rounded-md border border-slate-700 px-3 py-1">Reset</button>
    <span className="text-xs text-slate-400">TODO: Bind to animation state</span>
  </div>
);

export default AnimationControls;
