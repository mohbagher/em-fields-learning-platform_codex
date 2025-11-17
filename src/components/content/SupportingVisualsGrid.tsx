import type { FC } from 'react';

/**
 * Grid of secondary visuals or diagrams to reinforce the primary concept.
 * TODO: Drive grid items from metadata and allow media type switching.
 */
const SupportingVisualsGrid: FC = () => (
  <section className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
    <h4 className="text-lg font-semibold text-white">Supporting visuals</h4>
    <p className="mt-2 text-sm text-slate-300">TODO: Render supporting diagrams and media.</p>
  </section>
);

export default SupportingVisualsGrid;
