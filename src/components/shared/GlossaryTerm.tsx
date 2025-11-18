import type { FC } from 'react';

/**
 * Inline glossary term with definition reveal.
 * TODO: Connect to glossary dataset and add hover/click interactions.
 */
const GlossaryTerm: FC<{ term: string; definition?: string }> = ({ term, definition }) => (
  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100" aria-label={definition ?? term}>
    {term}
  </span>
);

export default GlossaryTerm;
