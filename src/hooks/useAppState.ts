import { useAppState as useAppStateContext } from '../context/AppStateContext';

/**
 * Hook wrapper for accessing the global application state.
 * TODO: Extend with memoized selectors as state grows.
 */
export const useAppState = useAppStateContext;
