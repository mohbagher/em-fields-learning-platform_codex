import { createContext, ReactNode, useContext, useState } from 'react';

type AppState = {
  currentModule: string | null;
  currentSection: string | null;
  setCurrentModule: (module: string | null) => void;
  setCurrentSection: (section: string | null) => void;
};

const AppStateContext = createContext<AppState | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [currentModule, setCurrentModule] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  const value: AppState = {
    currentModule,
    currentSection,
    setCurrentModule,
    setCurrentSection,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }

  return context;
}
