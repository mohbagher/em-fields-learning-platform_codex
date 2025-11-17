import type { FC, ReactNode } from 'react';

/**
 * Lightweight tooltip wrapper for UI hints.
 * TODO: Implement hover/focus handling and positioning.
 */
const Tooltip: FC<{ content: ReactNode }> = ({ content }) => (
  <span className="relative inline-flex text-xs text-slate-200" aria-label="Tooltip placeholder">
    {content}
  </span>
);

export default Tooltip;
