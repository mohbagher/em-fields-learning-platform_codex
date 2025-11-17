import type { FC, ReactNode } from 'react';

/**
 * Generic modal overlay for supplementary content.
 * TODO: Add portal mounting, focus trapping, and dismiss logic.
 */
const Modal: FC<{ title?: string; children?: ReactNode }> = ({ title = 'Modal title', children }) => (
  <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-6 shadow-lg shadow-black/40">
    <div className="mb-3 flex items-center justify-between">
      <h5 className="text-lg font-semibold text-white">{title}</h5>
      <span className="text-xs text-slate-400">TODO: Close control</span>
    </div>
    <div className="text-sm text-slate-200">{children ?? 'Modal content placeholder.'}</div>
  </div>
);

export default Modal;
