import { useState, useCallback, useEffect } from "react";

export const useProcessStepsAutoPlay = (processSteps, expandedStep, setExpandedStep, setCompletedSteps) => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoPlayTimer, setAutoPlayTimer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const startAutoPlay = useCallback(() => {
    setIsAutoPlaying(true);
    const duration = 5000; // 5 seconds per step
    setTimeRemaining(duration);
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 100) {
          setExpandedStep(current => {
            const next = (current + 1) % processSteps.length;
            setCompletedSteps(prev => new Set([...prev, next]));
            return next;
          });
          return duration;
        }
        return prev - 100;
      });
    }, 100);
    
    setAutoPlayTimer(timer);
  }, [processSteps.length, setExpandedStep, setCompletedSteps]);

  const stopAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      setAutoPlayTimer(null);
    }
    setTimeRemaining(0);
  }, [autoPlayTimer]);

  const handleStepToggle = useCallback((index) => {
    const newExpandedStep = expandedStep === index ? -1 : index;
    setExpandedStep(newExpandedStep);
    
    // Mark step as completed when expanded
    if (newExpandedStep !== -1) {
      setCompletedSteps(prev => new Set([...prev, index]));
    }

    // Reset auto-play when manually interacting
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        setAutoPlayTimer(null);
      }
    }
  }, [expandedStep, isAutoPlaying, autoPlayTimer, setExpandedStep, setCompletedSteps]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextStep = Math.min(expandedStep + 1, processSteps.length - 1);
        handleStepToggle(nextStep);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevStep = Math.max(expandedStep - 1, 0);
        handleStepToggle(prevStep);
      } else if (e.key === ' ') {
        e.preventDefault();
        if (isAutoPlaying) {
          stopAutoPlay();
        } else {
          startAutoPlay();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedStep, processSteps.length, handleStepToggle, isAutoPlaying, startAutoPlay, stopAutoPlay]);

  // Cleanup auto-play on unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
      }
    };
  }, [autoPlayTimer]);

  const autoPlayProgress = isAutoPlaying ? ((5000 - timeRemaining) / 5000) * 100 : 0;

  return {
    isAutoPlaying,
    autoPlayProgress,
    timeRemaining,
    startAutoPlay,
    stopAutoPlay,
    handleStepToggle
  };
};