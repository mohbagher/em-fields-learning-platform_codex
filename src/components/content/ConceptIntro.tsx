import type { FC } from 'react';

/**
 * Introductory blurb for a concept, combining text and quick visuals.
 * TODO: Accept concept metadata and render key takeaways.
 */
const ConceptIntro: FC = () => (
  <section className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
    <h4 className="text-lg font-semibold text-white">Concept introduction</h4>
    <p className="mt-2 text-sm text-slate-300">TODO: Load concept intro content.</p>
  </section>
);

export default ConceptIntro;
