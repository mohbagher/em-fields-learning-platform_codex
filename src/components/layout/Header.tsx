import type { FC } from 'react';

/**
 * Global header displaying product branding and cross-module controls.
 * TODO: Replace placeholder copy with live navigation, user info, and status indicators.
 */
const Header: FC = () => (
  <header className="border-b border-slate-800 bg-slate-900/70 px-6 py-4">
    <div className="mx-auto flex max-w-6xl items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">Learning Platform</p>
        <h1 className="text-2xl font-semibold leading-tight">EM Fields</h1>
      </div>
      <p className="text-sm text-slate-400">TODO: Insert header actions and global controls.</p>
    </div>
  </header>
);

export default Header;
