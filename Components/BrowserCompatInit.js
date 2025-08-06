"use client";
import { useEffect } from 'react';
import { initBrowserCompat } from '../utils/browserCompat';

/**
 * BrowserCompatInit Component
 * Initializes browser compatibility fixes and polyfills
 */
const BrowserCompatInit = () => {
  useEffect(() => {
    // Initialize all browser compatibility features
    initBrowserCompat();
    
    // Log browser information for debugging
    if (process.env.NODE_ENV === 'development') {
      import('../utils/browserCompat').then(({ getBrowser, getPlatform }) => {
        console.log(`Browser: ${getBrowser()}, Platform: ${getPlatform()}`);
      });
    }
  }, []);

  return null; // This component doesn't render anything
};

export default BrowserCompatInit;