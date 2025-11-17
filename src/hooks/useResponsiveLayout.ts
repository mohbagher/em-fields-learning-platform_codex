import { useEffect, useState } from 'react';

/**
 * Hook reporting coarse responsive breakpoints.
 * TODO: Sync with Tailwind breakpoints and debounce resize handling.
 */
export function useResponsiveLayout() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 1024);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return { isDesktop };
}
