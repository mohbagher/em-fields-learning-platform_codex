import { useEffect, useState } from 'react';

/**
 * Collects lightweight performance metrics for simulations.
 * TODO: Integrate with PerformanceObserver and telemetry pipeline.
 */
export function usePerformance() {
  const [fps, setFps] = useState<number | null>(null);

  useEffect(() => {
    let frame = 0;
    let lastTime = performance.now();

    const update = () => {
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;
      if (delta > 0) {
        setFps(1000 / delta);
      }
      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return { fps };
}
