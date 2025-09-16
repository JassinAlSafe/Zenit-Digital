import { useState, useCallback, useEffect } from 'react';

export type LoadingState = 'loading' | 'content-ready' | 'hidden';

interface UseLoadingStateReturn {
  loadingState: LoadingState;
  isLoading: boolean;
  isContentReady: boolean;
  isHidden: boolean;
  startContentAnimation: () => void;
  hideLoadingScreen: () => void;
  resetLoadingState: () => void;
}

export const useLoadingState = (): UseLoadingStateReturn => {
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');

  const startContentAnimation = useCallback(() => {
    setLoadingState('content-ready');
  }, []);

  const hideLoadingScreen = useCallback(() => {
    setLoadingState('hidden');
  }, []);

  const resetLoadingState = useCallback(() => {
    setLoadingState('loading');
  }, []);

  // Listen for navigation events to reset loading state when returning to home
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleNavigationToHome = () => {
      // Check if we're navigating to the home page from another page
      const currentPath = window.location.pathname;
      const previousPath = sessionStorage.getItem('currentPath') || '/';

      if (currentPath === '/' && previousPath !== '/') {
        // Reset loading state when navigating back to home from another page
        setTimeout(() => {
          resetLoadingState();
        }, 100);
      }

      // Update current path
      sessionStorage.setItem('currentPath', currentPath);
    };

    // Initial path tracking
    sessionStorage.setItem('currentPath', window.location.pathname);

    // Listen for route changes (for client-side navigation)
    window.addEventListener('popstate', handleNavigationToHome);

    return () => {
      window.removeEventListener('popstate', handleNavigationToHome);
    };
  }, [resetLoadingState]);

  return {
    loadingState,
    isLoading: loadingState === 'loading',
    isContentReady: loadingState === 'content-ready',
    isHidden: loadingState === 'hidden',
    startContentAnimation,
    hideLoadingScreen,
    resetLoadingState,
  };
};