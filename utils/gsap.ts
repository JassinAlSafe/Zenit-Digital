import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { AnimationConfig, GSAPCleanupOptions } from "../types/components";

// GSAP setup utility - should be called in each component's useEffect
export const setupGSAP = () => {
  if (typeof window !== "undefined") {
    // Register plugins in each component (per GSAP best practices)
    gsap.registerPlugin(ScrollTrigger);
  }
};

// Animation constants used throughout the app
export const ANIMATION_CONFIG: AnimationConfig = {
  durations: {
    fast: 0.3,
    normal: 1,
    slow: 1.2,
    letterStagger: 0.04,
  },
  ease: {
    power1: "power1.out",
    power2: "power2.out", 
    power3: "power3.out",
    power4: "power4.out",
    elastic: "elastic.out(1, 0.3)",
    linear: "linear",
  },
  offsets: {
    letterReveal: 160,
    smallReveal: 60,
  },
  scrollTrigger: {
    start: "top 80%",
    centerStart: "top center",
    centerEnd: "bottom center",
  },
} as const;

// Utility function for proper GSAP cleanup (per React best practices)
export const cleanupGSAP = (options: GSAPCleanupOptions = {}) => {
  const { triggers = [], tweens = [] } = options;
  // Kill ScrollTriggers first
  triggers.forEach(trigger => trigger?.kill());
  // Then kill tweens
  tweens.forEach(tween => tween?.kill());
};

// Helper to create ScrollTrigger with automatic cleanup tracking
export const createScrollTrigger = (config: ScrollTrigger.Vars, triggersArray: ScrollTrigger[]) => {
  const trigger = ScrollTrigger.create(config);
  triggersArray.push(trigger);
  return trigger;
};

// Export for direct use
export { gsap, ScrollTrigger };