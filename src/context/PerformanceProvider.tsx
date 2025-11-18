import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

/**
 * Provides shared performance metrics across the app.
 * TODO: Integrate with usePerformance hook and telemetry dashboards.
 */
type PerformanceContextValue = {
  fps: number | null;
  setFps: (fps: number | null) => void;
};

const PerformanceContext = createContext<PerformanceContextValue | undefined>(undefined);

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [fps, setFps] = useState<number | null>(null);
  const value = useMemo(() => ({ fps, setFps }), [fps]);

  return <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>;
}

export function usePerformanceContext() {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformanceContext must be used within a PerformanceProvider');
  }
  return context;
}
