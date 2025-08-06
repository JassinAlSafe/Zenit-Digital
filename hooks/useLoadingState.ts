import { useState, useCallback } from 'react';

export type LoadingState = 'loading' | 'content-ready' | 'hidden';

interface UseLoadingStateReturn {
  loadingState: LoadingState;
  isLoading: boolean;
  isContentReady: boolean;
  isHidden: boolean;
  startContentAnimation: () => void;
  hideLoadingScreen: () => void;
}

export const useLoadingState = (): UseLoadingStateReturn => {
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');

  const startContentAnimation = useCallback(() => {
    setLoadingState('content-ready');
  }, []);

  const hideLoadingScreen = useCallback(() => {
    setLoadingState('hidden');
  }, []);

  return {
    loadingState,
    isLoading: loadingState === 'loading',
    isContentReady: loadingState === 'content-ready',
    isHidden: loadingState === 'hidden',
    startContentAnimation,
    hideLoadingScreen,
  };
};