// contexts/OSContext.tsx or utils/OSContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface OSContextType {
  isWindows: boolean;
  isDetected: boolean;
}

interface OSProviderProps {
  children: ReactNode;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider = ({ children }: OSProviderProps) => {
  const [isWindows, setIsWindows] = useState(false);
  const [isDetected, setIsDetected] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const detectWindows = () => {
        return window.navigator.platform.toLowerCase().includes('win');
      };
      
      setIsWindows(detectWindows());
      setIsDetected(true);
    }
  }, []);

  return (
    <OSContext.Provider value={{ isWindows, isDetected }}>
      {children}
    </OSContext.Provider>
  );
};

export const useOS = (): OSContextType => {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
};