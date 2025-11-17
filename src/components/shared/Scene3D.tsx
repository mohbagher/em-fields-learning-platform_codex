import type { FC } from 'react';

/**
 * Placeholder container for WebGL/Three.js based 3D scenes.
 * TODO: Mount scene renderer and expose controls for orbit/pan/zoom.
 */
const Scene3D: FC = () => (
  <div className="flex min-h-[220px] items-center justify-center rounded-md border border-dashed border-blue-400/30 bg-blue-400/5">
    <span className="text-xs text-blue-100">3D scene placeholder</span>
  </div>
);

export default Scene3D;
