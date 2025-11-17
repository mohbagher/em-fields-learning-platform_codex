import type { FC } from 'react';

/**
 * Placeholder canvas for 2D drawings.
 * TODO: Integrate rendering hooks and resize observers.
 */
const Canvas2D: FC = () => (
  <div className="flex min-h-[180px] items-center justify-center rounded-md border border-dashed border-emerald-400/30 bg-emerald-400/5">
    <span className="text-xs text-emerald-100">2D canvas placeholder</span>
  </div>
);

export default Canvas2D;
