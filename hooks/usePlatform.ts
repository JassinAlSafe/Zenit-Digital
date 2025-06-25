import { useState, useEffect } from 'react';

interface PlatformInfo {
  isWindows: boolean;
  isMac: boolean;
  isLinux: boolean;
  isMobile: boolean;
  supportsWebM: boolean;
  isHydrated: boolean;
}

export const usePlatform = (): PlatformInfo => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo>({
    isWindows: false,
    isMac: false,
    isLinux: false,
    isMobile: false,
    supportsWebM: false,
    isHydrated: false,
  });

  useEffect(() => {
    // Only run on client side after hydration
    if (typeof window === "undefined") return;

    const userAgent = window.navigator.userAgent;
    
    // Platform detection
    const isWindows = /windows/i.test(userAgent);
    const isMac = /macintosh|mac os x/i.test(userAgent);
    const isLinux = /linux/i.test(userAgent);
    const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    
    // Feature detection for WebM support
    const supportsWebM = (() => {
      try {
        const video = document.createElement('video');
        return video.canPlayType('video/webm; codecs="vp8, vorbis"') !== '';
      } catch {
        return false;
      }
    })();

    setPlatformInfo({
      isWindows,
      isMac,
      isLinux,
      isMobile,
      supportsWebM,
      isHydrated: true,
    });
    
    setIsHydrated(true);
  }, []);

  return platformInfo;
};